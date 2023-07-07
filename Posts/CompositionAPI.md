# VUE3 Study Notes

## 01. Building Vue3 Projects with create-vue

**Understanding  `create-vue`**

`create-vue` is the new official scaffolding tool for Vue, which has switched to the `Vite` (next-generation frontend toolchain) as its underlying framework, providing rapid response for development.

---

### Prerequisites

`Node.js` version 16.0 or higher should be installed.

---

#### Creating a Vue Application

`npm init vue@latest`

This command installs and executes create-vue.



---

#### Installing Dependencies

`npm install`

This command installs the necessary dependencies.

---



#### Project Directory and Key Files

1. `vite.config.js`: The configuration file for the project, based on Vite configuration.
2. `package.json`: The project package file, with Vue 3.x and Vite as the core dependencies.
3. `main.js`: The entry file where the createApp function creates the application instance.
4. `app.vue`: The root component Single File Component (SFC) consisting of script-template-style.

   Changes:

   - Reordering of script and module.
   - The template no longer requires a single root element.
   - The script adds the setup flag to support the Composition API.
5. `index.html`: The single-page entry file that provides the mounting point with the ID "app".

---





## 02.Composition API


### 1.Setup

---


**Original Complex Syntax**

```apache
<script>
	export default {
	   setup() {
	      // Data
	      const message = 'this is a message'
	      // Function
	      const logMessage = () => {
		 console.log(message)	  
	      }
	      return {
		message,
		logMessage
	       }	   
	   }
         }
<script>
```

**Syntax Sugar**

```apache
<script setup>
// Data
const message = 'this is a message'
// Function
const logMessage = () => {
   console.log(message)
}
</script>
```

---









### 2.Reactive

---



Purpose: Accepts an object-type data parameter and returns a reactive object.

Core Idea:

```apache
<script setup>
// Import
import { reactive } from 'vue'

// Execute the function, pass the parameter, and receive the variable
const state = reactive(objectTypeData)

</script>
```

1. Import the `reactive` function from the Vue package.
2. Execute the function `reactive` within the `<script setup>` block, passing the initial value of an object-type variable, and receive the returned value using a variable.

---









### 3.Computed

---



Purpose: The basic idea of computed properties remains the same as in Vue 2, but the syntax has changed in the Composition API.

Core Idea:

```apache
<script setup>
// Import
import { computed } from 'vue'

// Execute the function, receive the variable, and return the computed value in the callback parameter
const computedState = computed(() => {
   return computedValueBasedOnReactiveData
})

</script>
```

1. Import the `computed` function.
2. Execute the function within the `<script setup>` block, receive the returned value using a variable, and return the computed value based on reactive data in the callback parameter.

---









### 4.Watch

---



Purpose: Listening to a single data

Core Idea:

```apache
<script setup>
// Import watch
import { ref, watch } from 'vue'
const count = ref(0)

// Call watch to listen for changes
watch(count, (newValue, oldValue) => {
   console.log(`count has changed, old value is ${oldValue}, new value is ${newValue}`)
})
</script>11
```

Listening to multiple data

Core Idea:

```apache
<script setup>
// Import watch and declare multiple data
import { ref, watch } from 'vue'
const count =

 ref(0)
const name = ref('cp')


watch(
    [newCount, newName], [oldCount, oldName]) => {
       console.log(`count or name has changed, [newCount, newName], [oldCount, oldName])
     })

</script>
```

---









### 5.Immediate

---



Purpose: Trigger the callback immediately when the watch is created, and continue to execute the callback after subsequent data changes.

Core Idea:

```apache
const count = ref(0)
watch(count, () => {
   console.log('count has changed')
},{
   immediate: true
})
```

---









### 6.Deep

---



By default, ref objects listened to by watch are shallow watched. Directly modifying nested object properties will not trigger the callback. To enable deep watching, the `deep` option needs to be enabled.

Core Idea:

```apache
const state = ref({ count: 0 })
watch(state, () => console.log('count has changed'))

const changeStateByCount = () => {
  // Modifying the property directly does not trigger the callback
  state.value.count++
}
```

When listening to a specific property of an object:

Example: Without enabling deep watching, listening to changes in the `age` property requires the following changes:

Before:

```apache
const info = ref({
   name: 'cp'
   age: 18
})
```

After:

```apache
const info = ref({
   name: 'cp'
   age: 18
})

watch(
   () => info.value.age
   () => console.log('age has changed')
)
```

---









### 7.Lifecycle Hooks

---



**Lifecycle APIs in Vue 3**

| Options API          | Composition API |
| -------------------- | --------------- |
| beforeCreate/created | setuo           |
| beforeMount          | onBeforeMount   |
| mounted              | onMounted       |
| beforeUpdated        | onBeforeUpdate  |
| Updated              | onUpdated       |
| beforeUnmount        | onBeforeUnmount |
| unmounted            | onUnmounted     |

Purpose:

1. Import the lifecycle functions.
2. Execute the lifecycle function and pass the callback.

Core Idea:

```apache
import { onMounted } from 'vue'

onMounted(() => {
   // Custom logic
})
```

Lifecycle functions can be executed multiple times. When executed multiple times, the callbacks passed will be executed sequentially when the timing is ripe.

Core Idea:

```apache
onMounted(() => {
   console.log('mount1')
})

onMounted(() => {
   console.log('mount2')
})
```

---









### 8.Parent-Child Communication

---



##### Parent-to-Child Communication

1. Bind the attribute to the child component in the parent component.
2. Receive the attribute using the props option in the child component.

Core Idea:

Parent Component

```apache
<script setup>
// Import the child component
import SonComponent from './son-component.vue'
</script>

<template>
// Bind the 'message' attribute
   <SonComponent message="this is app message"
<template>
```

Child Component

```apache
<script setup>
// Use defineProps compiler macro to receive the data passed from the parent component
const props = defineProps({
   message: String
})
<script>

<template>
   {{ message }}
<template>
```

##### Child-to-Parent Communication

1. Bind the event using `@` in the parent component's child component tag.
2. Trigger the event using the emit method inside the child component.

Core Idea:

```apache
<script setup>
// Import the child component
import SonComponent from './son-component.vue'
const getMessage = (msg) => {
   console.log(msg)
})
</script>

<template>
// Bind the custom event


   <SonComponent @get-message="getMessage"  />
<template>
```

Child Component

```apache
<script setup>
// Use defineEmits compiler macro to generate the emit method
const emit = defineEmits(['get-message'])

const sendMsg = () => {
// Trigger the custom event and pass the parameter
   emit('get-message', 'this is son msg')
}
<script>

<template>
   <button @click='click="sendMsg">sendMsg</button>
<template>
```

---









### 9.Template Reference

---



Concept: Retrieve the actual DOM object or component instance object using the `ref` identifier.

`this.$refs.form.validate()`

Core Idea: (Using DOM as an example, applies to components as well)

```apache
<script setup>
import { ref } form 'vue'
// Call the ref function to get a ref object
const h1Ref = ref(null)
<script>

<template>
    // Bind the ref object using the ref identifier
    <h1 ref="h1Ref">I am a h1 tag</h1>
<template>
```

1. Call the `ref` function to generate a `ref` object.
2. Bind the `ref` object to the tag using the `ref` identifier.

Note:

`defineExpose()`

By default, the properties and methods inside the `<script setup>` block of a component are not exposed to the parent component. You can use the `defineExpose()` compiler macro to specify which properties and methods are allowed to be accessed.

Core Idea:

```apache
<script setup>
import { ref } form 'vue'
const h1Ref = ref(null)

defineExpose({
   testMessage
})
<script>
```

---









### 10.Provide/Inject

---



Purpose: Passing data and methods from a top-level component to any child component, enabling cross-level component communication.

`room-page => room-msg-item => room-msg-comment`

Passing normal data across levels

Syntax:

Top-level component

```apache
provide('key', top-level data)
```

Child component

```apache
const message = inject('key')
```

1. The top-level component provides data using the `provide` function.
2. The child component retrieves the data using the `inject` function.

---

### Comprehensive Example

#### Running the Project

---

1. `npm install`
2. `npm run dev`

[
    allen0923/vue3-CompositionAPI (github.com)](https://github.com/allen0923/vue3-CompositionAPI)

#### API Documentation

---

##### List

`axios.get('/list')`

##### Delete

`axios.delete(`

##### Edit

```javascript
axios.patch(/edit/${id}, {
  name: 'name',
  place: 'origin',
})
```

#### Code Blocks

---

###### App.vue

```javascript
// TODO: List Rendering
// Basic logic: 1. Declare a reactive list.
              //2. Call an API to fetch data.
              //3. Assign the backend data to the list.
              //4. Bind the list to the table component.
const list = ref([])
const getList = async () =>{
  
    // Call the API
    const res = await axios.get('/list')
    // Assign to the 'list' variable
    list.value = res.data
}
onMounted(() => getList())
```

```javascript
// TODO: Delete functionality
// Basic logic: 
//1. Get the ID of the current item 
//2. Call the delete API with the ID 
//3. Update the latest list
const onDelete = async(id) => {
    console.log(id)
    await axios.delete(`/del/${id}`)
    getList()

}
```

```javascript
// TODO: Edit functionality


// Basic logic: 1. Open the dialog 2. Populate data 3. Update data

// 1. Open the dialog (get the instance of the child component, call methods, or modify properties)
// 2. Populate data (call the detail endpoint or use static data of the current row)
const editRef = ref(null)
const onEdit = (row) => {
  editRef.value.open(row)
}
```

---

###### Edit.vue

```javascript

// TODO: Edit
import { ref, defineExpose, onUpdated } from 'vue'
import axios from 'axios'
// Dialog visibility
const dialogVisible = ref(false)


//Prepare Form
const form = ref({
  name: '',
  place: '',
  id: ''
})

const open = (row) => {
  console.log(row)
  //name
  form.value.name = row.name
  //place
  form.value.place = row.place
  //id
  form.value.id = row.id
  dialogVisible.value = true
}
defineExpose({
  open
})

//Update
const emit = defineEmits(['on-update'])
const onUpdate = async () => {
  //1.Collect form data, call the API
  await axios.patch(`/edit/${form.value.id}`, {
    name: form.value.name,
    place: form.value.place,
  })
  //2.Close the dialog
  dialogVisible.value = false
  //3.Notify parent component to update the list
  emit('on-update')

}
```

---

###### Result Screenshot

**List**

![1688433913723](image/readme/1688433913723.png)

**Edit**

![1688433952704](image/readme/1688433952704.png)

**Form**

![1688433969947](image/readme/1688433969947.png)

**Update(Save and Change Data)**

![1688433990211](image/readme/1688433990211.png)
