<template>
  <div>
    <h1>Comparison List</h1>
    <table>
      <tr>
        <th>Product Title</th>
        <th>Product Image</th>
        <th>Product Description</th>
        <th>Product Price</th>
        <th>Product Rating</th>
      </tr>
      <tr v-for="item in comparisonList" :key="item.id">
        <td>{{ item.title }}</td>
        <td><img :src="item.image" alt="Product Image" /></td>
        <td>{{ item.description }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.rating }}</td>
        <td>
          <button @click="removeItem(item)">Remove</button>
        </td>
      </tr>
    </table>
    <button @click="clearComparisonList">Clear Comparison List</button>
  </div>
</template>

<script