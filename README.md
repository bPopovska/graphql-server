Mutation to add item:
```{javascript}
# Write your query or mutation here
mutation AddItem($name: String!, $duration: String!, $status: String!) {
  addItem(name: $name, duration: $duration, status: $status) {
    name
    duration
    status
  }
}
```
