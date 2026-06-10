import { Component } from '@angular/core';
import { DxTreeListModule } from 'devextreme-angular/ui/tree-list';
import CustomStore from 'devextreme/data/custom_store';
import { Employee, employees } from './data';

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

@Component({
    selector: 'app-root',
    imports: [DxTreeListModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  dataKey = dataKey;

  expandedRowKeys = ['John Heart'];

  dataSource = new CustomStore<Employee, string>({
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
}
