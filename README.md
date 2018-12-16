## CRUD example 

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

Mutation to edit item:
```
mutation ModifyItem($id: Int!, $name: String!, $duration: String!, $status: String!) {
  modifyItem(id: $id, name: $name, duration: $duration, status: $status) {
    name
    duration
    status
  }
}
```


## Jira tasks

```
{
  tasks {
    id
    description
    reporter {
      name
      role
    }
    assignee {
      name
      role
    }
    status
    timeEntries {
      description
      person {
        name
        role
      }
      timeLogged
    }
  }
}
```
