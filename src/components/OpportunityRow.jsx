const OpportunityRow = ({ title, aplications, status, target, deadline }) => (
  <tr class="bg-white border-b hover:bg-blue-500">
    <td class="w-4 p-4">
      <div class="flex items-center">
        <input
          id="checkbox-table-search-1"
          type="checkbox"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
        <label for="checkbox-table-search-1" class="sr-only">
          checkbox
        </label>
      </div>
    </td>
    <th
      scope="row"
      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
    >
      {title}
    </th>
    <td class="px-6 py-4">{status}</td>
    <td class="px-6 py-4">{target}</td>
    <td class="px-6 py-4">{deadline}</td>
    <td class="px-6 py-4">{aplications}</td>
    <td class="px-6 py-4">...</td>
  </tr>
);

export default OpportunityRow;
