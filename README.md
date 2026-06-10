<!-- default badges list -->
![](https://img.shields.io/endpoint?url=https://codecentral.devexpress.com/api/v1/VersionRange/181375512/25.2.3%2B)
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T830420)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
[![](https://img.shields.io/badge/💬_Leave_Feedback-feecdd?style=flat-square)](#does-this-example-address-your-development-requirementsobjectives)
<!-- default badges end -->
# TreeList for DevExtreme - How to perform CRUD operations on a hierarchical data source

If the [dataStructure](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxTreeList/Configuration/#dataStructure) option is set to "tree", and the [editing](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxTreeList/Configuration/editing/) option is enabled, the "E4009 - Data item cannot be found" error occurs while trying to edit child items. It indicates that the specified key is not found even if the key is present in data and correct. This can be confusing. The cause of this issue is that TreeList editing does not work with hierarchical data out of the box: the underlying data source cannot perform the create, update, and delete operations on hierarchical data, so it throws the E4009 error.

If you need to edit hierarchical data using TreeList, implement the [CustomStore](https://js.devexpress.com/Documentation/ApiReference/Data_Layer/CustomStore/)'s `insert`, `remove`, and `update` methods manually. This example shows how to do that.

![TreeList for DevExtreme - How to perform CRUD operations on a hierarchical data source](images/treelist-crud-hierarchical-data.png)

## Files to Review

- **jQuery**
    - [index.js](jQuery/src/index.js)
- **Angular**
    - [app.component.html](Angular/src/app/app.component.html)
    - [app.component.ts](Angular/src/app/app.component.ts)
- **Vue**
    - [HomeContent.vue](Vue/src/components/HomeContent.vue)
- **React**
    - [App.tsx](React/src/App.tsx)
- **ASP.NET Core**
    - [Index.cshtml](ASP.NET%20Core/Views/Home/Index.cshtml)

## Documentation

- [Getting Started with TreeList](https://js.devexpress.com/Documentation/Guide/UI_Components/TreeList/Getting_Started_with_TreeList/)
- [TreeList - API Reference](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxTreeList/)
- [CustomStore](https://js.devexpress.com/Documentation/ApiReference/Data_Layer/CustomStore/)
<!-- feedback -->
## Does This Example Address Your Development Requirements/Objectives?

[<img src="https://www.devexpress.com/support/examples/i/yes-button.svg"/>](https://www.devexpress.com/support/examples/survey.xml?utm_source=github&utm_campaign=devextreme-treelist-perform-crud-operations-on-hierarchical-data-source&~~~was_helpful=yes) [<img src="https://www.devexpress.com/support/examples/i/no-button.svg"/>](https://www.devexpress.com/support/examples/survey.xml?utm_source=github&utm_campaign=devextreme-treelist-perform-crud-operations-on-hierarchical-data-source&~~~was_helpful=no)

(you will be redirected to DevExpress.com to submit your response)
<!-- feedback end -->
