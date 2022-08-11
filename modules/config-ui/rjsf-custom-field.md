1. add dependecy to config-ui package

```
yarn workspace config-ui add react-datepicker

yarn workspace config-ui add @types/react-datepicker -D
```

2. copy components folder to `modules/config-ui/src`

3. in ConfigEditorPage provides widgets to form

```
    const widgets = {
        "time": TimePickerWidget
    };
    ...
    <Form
        id="cForm"
        // @ts-ignore
        ref={(form) => {
        configForms.push(form);
        }}
        widgets={widgets} // provides custom widgets
        onSubmit={onSubmit}
    ...
```

4. in json config configure this custom widgets to be used with submit_by field

add field

```
...


"submit_by1": {
    "title": "Submit by 1",
    "type": "string"
  },
...


"uischema": {
    "class_attendance":{
      "submit_by1":{
        "ui:widget": "time"
      }
    }
  }
```
