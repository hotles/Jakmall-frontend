<template>
  <div class="root">
     <div class="container__progress">
          <ul class="progressbar">
            <li class="step__1">Delivery</li>
            <li>Payment</li>
            <li class="step__3">Finish</li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
  name: 'StepProgress',
  props:['length'],
  data () {
    return {
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.container__progress
  width: 100%
  position: absolute
  z-index: 1
  right: -14%

li
  background #fffae6
  padding-bottom 15px

.step__3
  border-radius: 0 0 50px 0;

.step__1
  border-radius: 0 0 0 50px;


.progressbar li
  float: left
  width: 20%
  position: relative
  text-align: center

.progressbar li:before
  content:"1"
  width: 30px
  height: 30px

.progressbar
  counter-reset: step
  list-style-type : none
  // max-width : 90%

.progressbar li:before
  content:"1"
  width: 30px
  height: 30px
  border: 2px solid #bebebe
  display: block
  margin: 0 auto 10px auto
  border-radius: 50%
  line-height: 27px
  background: white
  color: #bebebe
  text-align: center
  font-weight: bold

.progressbar li:before
  content:counter(step)
  counter-increment: step
  width: 30px
  height: 30px
  border: 2px solid #bebebe
  display: block
  margin: 0 auto 10px auto
  border-radius: 50%
  line-height: 27px
  background: white
  color: #bebebe
  text-align: center
  font-weight: bold

.progressbar li:after
  content: ''
  position: absolute
  width:100%
  height: 3px;
  background: #979797
  top: 15px
  left: -50%
  z-index: -1

.progressbar li:first-child:after
  content: none;

</style>