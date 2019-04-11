<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    class="blog-content"
    v-html="$md.render('@[toc]([ 目次 ])\n' + content)"
  />
  <!--eslint-enable-->
</template>

<script>
export default {
  components: {},
  props: {
    content: { type: String, required: true }
  },
  computed: {},
  mounted() {
    this.$microlinkjs('.link-preview')
  }
}
</script>

<style lang="postcss">
.blog-content {
  @apply py-4 leading-normal text-grey-darkest;
}

.blog-content > :first-child + h3 {
  @apply text-center;
}
.blog-content > :first-child + h3 + ul {
  @apply pt-16 pb-5 px-2 -mt-12 mb-10 ml-0 bg-grey-lightest border leading-loose;
}

.blog-content h2:not(:first-child) {
  @apply mt-6;
}
.blog-content h3:not(:first-child),
.blog-content h4:not(:first-child),
.blog-content h5:not(:first-child) {
  @apply mt-4;
}
.blog-content a {
  @apply no-underline text-blue;
}
.blog-content a:hover {
  @apply text-blue-darker;
}
.blog-content pre {
  @apply overflow-x-auto;
}
.blog-content > p {
  @apply mb-4;
}
.blog-content a[target='_blank']:not(.link-preview):not(.img-preview)::after {
  content: '';
  display: inline-block;
  top: 0em;
  left: 0em;
  width: 0.8em;
  height: 0.8em;
  background-image: url(data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJleHRlcm5hbC1saW5rLWFsdCIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLWV4dGVybmFsLWxpbmstYWx0IGZhLXctMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDU3NiA1MTIiPjxwYXRoIGZpbGw9IiM4M2E3ZDEiIGQ9Ik01NzYgMjR2MTI3Ljk4NGMwIDIxLjQ2MS0yNS45NiAzMS45OC00MC45NzEgMTYuOTcxbC0zNS43MDctMzUuNzA5LTI0My41MjMgMjQzLjUyM2MtOS4zNzMgOS4zNzMtMjQuNTY4IDkuMzczLTMzLjk0MSAwbC0yMi42MjctMjIuNjI3Yy05LjM3My05LjM3My05LjM3My0yNC41NjkgMC0zMy45NDFMNDQyLjc1NiA3Ni42NzZsLTM1LjcwMy0zNS43MDVDMzkxLjk4MiAyNS45IDQwMi42NTYgMCA0MjQuMDI0IDBINTUyYzEzLjI1NSAwIDI0IDEwLjc0NSAyNCAyNHpNNDA3LjAyOSAyNzAuNzk0bC0xNiAxNkEyMy45OTkgMjMuOTk5IDAgMCAwIDM4NCAzMDMuNzY1VjQ0OEg2NFYxMjhoMjY0YTI0LjAwMyAyNC4wMDMgMCAwIDAgMTYuOTctNy4wMjlsMTYtMTZDMzc2LjA4OSA4OS44NTEgMzY1LjM4MSA2NCAzNDQgNjRINDhDMjEuNDkgNjQgMCA4NS40OSAwIDExMnYzNTJjMCAyNi41MSAyMS40OSA0OCA0OCA0OGgzNTJjMjYuNTEgMCA0OC0yMS40OSA0OC00OFYyODcuNzY0YzAtMjEuMzgyLTI1Ljg1Mi0zMi4wOS00MC45NzEtMTYuOTd6Ii8+PC9zdmc+);
  background-size: 0.8em 0.8em;
  @apply mx-1;
}
.blog-content pre.hljs {
  @apply my-4 p-4;
}
.blog-content ol,
.blog-content ul {
  @apply mb-4 leading-loose;
}
.blog-content img {
  @apply my-4;
}

.blog-content blockquote {
  @apply block relative mt-4 mb-8 italic text-grey-darker bg-grey-lighter border-l-4 border-blue-light shadow-md pl-6 pr-2 pt-8 pb-2;
}

.blog-content blockquote:before {
  content: '“';
  font-family: sans-serif;
  font-size: 90px;
  @apply inline-block absolute pin-t pin-l pt-1 pl-1 text-blue-light align-middle leading-none;
}

.blog-content blockquote p {
  @apply p-0 my-3 leading-normal;
}

.blog-content table {
  @apply border w-full;
}
.blog-content table > thead > tr > th,
.blog-content table > tbody > tr > th {
  @apply text-grey-darkest bg-grey-lightest border p-2;
}
.blog-content table > tbody > tr > td {
  @apply border p-2;
}

.blog-content .embed-responsive {
  padding-bottom: 56.25%;
  padding-top: 30px;
  height: 0;
  @apply relative overflow-hidden;
}
.blog-content .embed-responsive iframe,
.blog-content .embed-responsive object,
.blog-content .embed-responsive embed,
.blog-content .embed-responsive video {
  @apply absolute pin-t pin-l w-full h-full;
}
</style>
