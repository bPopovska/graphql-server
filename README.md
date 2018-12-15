Mutation to add item:
```{javascript}
mutation AddItem($name: String!, $duration: String!, $status: String!) {
  addItem(name: $name, duration: $duration, status: $status) {
    name
    duration
    status
  }
}
```

Mutation to remove item:
```
mutation RemoveItem($id: Int!) {
  removeItem(id: $id) {
   name
  }
}
```
