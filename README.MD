<!-- default file list -->
*Files to look at*:

* [index.html](./index.html)
* [index.js](./JS/index.js)
<!-- default file list end -->

# TreeList - How to perform CRUD operations on a hierarchical data source

<p>If the dxTreeList.dataStructure option is set to "tree", and the editing option is enabled, the "E4009 - Data item cannot be found" error occurs while trying to edit child items. Here is a sample page illustrating this error. It indicates that the specified key is not found even if the key is present in data and correct. This can be confusing. The cause of this issue is that  TreeList editing does not work with hierarchical data. Refer to this documentation page. At the current, our dataSource can't perform the create, edit and delete operations on hierarchical data, so it throws the E4009 error.</p>

<p>If you need to edit hierarchical data using TreeList, it is necessary to implement the CustomStore's insert, remove, and update methods manually.</p>