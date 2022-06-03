<template>
  <div :class="[`style-example style-example-${type}`]">
    <h4>
      <img src="./icons/check.svg" v-if="isGood" />
      <img src="./icons/uncheck.svg" v-if="!isGood" />
      {{ title || capitalize(type) }}
    </h4>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Example',
  props: {
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'good',
      validator: (value) => ['good', 'bad'].indexOf(value) !== -1
    }
  },
  setup(props) {
    const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);
    const isGood = props.type.toLowerCase() === 'good';

    return {
      capitalize,
      isGood
    }
  }
}
</script>
