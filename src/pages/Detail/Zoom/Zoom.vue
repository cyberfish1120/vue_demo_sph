<template>
  <div class="spec-preview">
    <img :src="imageUrl" />
    <div class="event" @mousemove="handler" ref="event"></div>
    <div class="big">
      <img :src="imageUrl" ref="img"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  data() {
    return {
      imageUrl: undefined
    }
  },
  props: ["imageList"],
  methods:{
    handler(e){
      let mask = this.$refs.mask, event = this.$refs.event
      let left = e.offsetX - (mask.offsetWidth>>1), maxLeft = event.offsetWidth - mask.offsetWidth
      if(left<0) left=0
      else if(left>maxLeft) left = maxLeft
      
      let top = e.offsetY - (mask.offsetHeight>>1), maxTop = event.offsetHeight - mask.offsetHeight
      if(top<0) top = 0
      else if(top>maxTop) top = maxTop

      mask.style.left = left + 'px'
      mask.style.top = top + 'px'

      let img = this.$refs.img
      img.style.left = -2*left + 'px'
      img.style.top = -2*top + 'px'
    }
  },
  watch: {
    imageList(){
      this.imageUrl = this.imageList[0].imgUrl
    }
  },
  mounted() {
    this.$bus.$on("imageUrl", (imageUrl) => {
      this.imageUrl = imageUrl;
    });
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>