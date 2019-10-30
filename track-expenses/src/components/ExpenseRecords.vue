<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Expense Records</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Date Time</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="record in records" :key="record.id">
              <td>{{ record.id }}</td>
              <td>{{ record.description }}</td>
              <td>{{ record.amount }}</td>
              <td>{{ record.dateTime }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="updateExpenseRecord(record)">Edit</a>
                <a href="#" @click.prevent="deleteExpenseRecord(record)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="(model.id ? 'Edit Expense ID#' + model.id : 'New Expense Record')">
          <form @submit.prevent="createExpenseRecord">
            <b-form-group label="Description">
              <b-from-input type="text" v-model="model.description"></b-from-input>
            </b-form-group>
            <b-form-group label="Amount">
              <b-from-input rows="4" type="number" v-model="model.amount"></b-from-input>
            </b-form-group>
            <b-form-group label="Date Time">
              <b-from-input rows="4" type="datetime-local" v-model="model.dateTime"></b-from-input>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Save Record</b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import api from "../services/ExpenseRecordsApiService";

export default {
  data() {
    return {
      loading: false,
      records: [],
      model: {}
    };
  },

  async created() {
    this.getAll();
  },

  methods: {
    async getAll() {
      this.loading = true;

      try {
        this.records = await api.getAll();
      } finally {
        this.loading = false;
      }
    },
    async updateExpenseRecord(expenseRecord) {
      //Use Object.assign() to create a new (separate) instance.
      this.model = Object.assign({}, expenseRecord);
    },
    async createExpenseRecord() {
      const isUpdate = !!this.model.id;

      if (isUpdate) {
        await api.update(this.model.id, this.model);
      } else {
        await api.create(this.model);
      }

      //Clear the data inside of the form
      this.model = {};

      //Fetch all records again to have latest data
      await this.getAll();
    },
    async deleteExpenseRecord(id) {
      if (confirm("Are you sure you want to delete this record?")) {
        //if we are editin a food record we deleted, remove it from the form
        if (this.model.id === id) {
          this.model = {};
        }

        await api.delete(id);
        await this.getAll();
      }
    }
  }
};
</script>

<style scoped>
</style>