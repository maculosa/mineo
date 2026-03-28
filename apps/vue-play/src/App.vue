<script setup lang="ts">
import { Typography } from '@mineo/ui'
import type { ProSelectItem } from '@mineo/pro-ui'
import { ProSelect, ProInput } from '@mineo/pro-ui'
import { ref } from 'vue';

const modelValue = ref('')
const items = ref<ProSelectItem[]>([
  { value: 'other', label: 'Other' },
  { value: 'fruits', label: 'Fruits', type: 'group', children: [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
  ] },
  { value: 'vegetables', label: 'Vegetables', type: 'group', children: [
    { value: 'carrot', label: 'Carrot' },
    { value: 'onion', label: 'Onion' },
    { value: 'potato', label: 'Potato' },
  ] },
  { value: 'meat', label: 'Meat', type: 'group', children: [
    { value: 'beef', label: 'Beef' },
    { value: 'chicken', label: 'Chicken' },
    { value: 'pork', label: 'Pork' },
  ] },
  { value: 'fish', label: 'Fish', type: 'group', children: [
    { value: 'salmon', label: 'Salmon' },
    { value: 'tuna', label: 'Tuna' },
    { value: 'shark', label: 'Shark' },
  ] },
])
</script>

<template>
  <div>
    <Typography strong class="mb-2">ProSelect</Typography>
    <ProSelect
      v-model="modelValue"
      :items="items"
      placeholder="Select a food"
    />
  </div>
  <div>
    <Typography strong class="mb-2">ProInput</Typography>
    <ProInput
      v-model="modelValue"
      placeholder="Search a food"
    />
  </div>

  <div class="w-100">

    <ProText color="destructive">Hello Pro Text</ProText>
    <Typography tag="h1">Hello Typography h1</Typography>
    <Typography tag="h2">Hello Typography h2</Typography>
    <Typography tag="h3">Hello Typography h3</Typography>
    <Typography tag="h4">Hello Typography h4</Typography>
    <Typography tag="p">Hello Typography p</Typography>
    <Typography tag="span">Hello Typography span</Typography>
    <Typography tag="blockquote">Hello Typography blockquote</Typography>
    <Typography tag="code">Hello Typography code</Typography>
    <Typography strong>Hello Typography strong</Typography>
    <Typography italic>Hello Typography italic</Typography>
    <Typography underline>Hello Typography underline</Typography>
    <Typography delete>Hello Typography delete</Typography>
    <Typography truncate>
      Hello Typography delete right, 
    我是一个截断的文字, 我会被截断为 "我是一个截断的文字", 我会被截断为 "我是一个截断的文字"
    </Typography>
    <Typography :lineClamp="2">
      Hello Typography delete right, 
    我是一个截断的文字, 我会被截断为 "我是一个截断的文字", 我会被截断为 "我是一个截断的文字"
    </Typography>

    <Typography copyable>
      Hello Typography copyable
    </Typography>
  </div>
 </template>
