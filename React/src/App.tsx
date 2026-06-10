import './App.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import TreeList, {
  Column,
  Editing,
  RequiredRule,
} from 'devextreme-react/tree-list';
import CustomStore from 'devextreme/data/custom_store';
import { employees } from './data';
import type { Employee } from './data';

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

function App(): JSX.Element {
  return (
    <div className="main">
      <TreeList
        id="employees"
        dataSource={dataSource}
        dataStructure="tree"
        keyExpr={dataKey}
        itemsExpr="items"
        parentIdExpr="Parent_ID"
        defaultExpandedRowKeys={expandedRowKeys}
        showRowLines={true}
        showBorders={true}
        columnAutoWidth={true}
      >
        <Editing
          mode="cell"
          allowAdding={true}
          allowUpdating={true}
          allowDeleting={true}
        />
        <Column dataField="Title" caption="Position" />
        <Column dataField="Full_Name">
          <RequiredRule />
        </Column>
        <Column dataField="City" />
        <Column dataField="State" />
        <Column dataField="Mobile_Phone" />
        <Column dataField="Hire_Date" dataType="date" />
      </TreeList>
    </div>
  );
}

export default App;
