<script setup lang="ts">
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import {
  DxColumn,
  DxEditing,
  DxRequiredRule,
  DxTreeList,
} from 'devextreme-vue/tree-list';
import CustomStore from 'devextreme/data/custom_store';
import { employees } from '../data';
import type { Employee } from '../data';

const dataKey = 'Full_Name';

interface ItemWithIndex {
  item: Employee;
  items: Employee[];
  index: number;
}

function findItem(
  items: Employee[],
  key: string | undefined,
  withIndex?: boolean,
): Employee | ItemWithIndex | null {
  let result: Employee | ItemWithIndex | null = null;
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    if (item[dataKey] === key) {
      result = withIndex ? { item, items, index: i } : item;
    } else if (item.items) {
      result = findItem(item.items, key, withIndex);
    }
    if (result) {
      return result;
    }
  }
  return result;
}

const dataSource = new CustomStore<Employee, string>({
  key: dataKey,
  loadMode: 'raw',
  load() {
    return employees;
  },
  insert(values: Employee) {
    const parentItem = findItem(employees, values.Parent_ID) as Employee | null;
    const newItem = { ...values };
    delete newItem.Parent_ID;
    if (!parentItem) {
      employees.push(newItem);
    } else {
      parentItem.items = parentItem.items || [];
      parentItem.items.push(newItem);
    }
    return Promise.resolve(newItem);
  },
  update(key: string, values: Employee) {
    const item = findItem(employees, key) as Employee | null;
    if (item) {
      Object.assign(item, values);
    }
    return Promise.resolve();
  },
  remove(key: string) {
    const itemWithIndex = findItem(employees, key, true) as ItemWithIndex | null;
    if (itemWithIndex) {
      itemWithIndex.items.splice(itemWithIndex.index, 1);
    }
    return Promise.resolve();
  },
});

const expandedRowKeys = ['John Heart'];
</script>
<template>
  <div>
    <DxTreeList
      id="employees"
      :data-source="dataSource"
      data-structure="tree"
      :key-expr="dataKey"
      items-expr="items"
      parent-id-expr="Parent_ID"
      :expanded-row-keys="expandedRowKeys"
      :show-row-lines="true"
      :show-borders="true"
      :column-auto-width="true"
    >
      <DxEditing
        mode="cell"
        :allow-adding="true"
        :allow-updating="true"
        :allow-deleting="true"
      />
      <DxColumn
        data-field="Title"
        caption="Position"
      />
      <DxColumn data-field="Full_Name">
        <DxRequiredRule/>
      </DxColumn>
      <DxColumn data-field="City"/>
      <DxColumn data-field="State"/>
      <DxColumn data-field="Mobile_Phone"/>
      <DxColumn
        data-field="Hire_Date"
        data-type="date"
      />
    </DxTreeList>
  </div>
</template>
<style>
#employees {
  max-height: 440px;
}
</style>
