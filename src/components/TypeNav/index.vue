<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseenter="enterShow" @mouseleave="leaveShow">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="isShow">
            <div class="all-sort-list2" @click.prevent="goSearch">
              <div
                class="item"
                v-for="firstCategory in categoryList"
                :key="firstCategory.categoryId"
              >
                <h3>
                  <a
                    href=""
                    :data-categoryName="firstCategory.categoryName"
                    :data-category1Id="firstCategory.categoryId"
                  >
                    {{ firstCategory.categoryName }}
                  </a>
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="secondCategory in firstCategory.categoryChild"
                      :key="secondCategory.categoryId"
                    >
                      <dt>
                        <a
                          href=""
                          :data-categoryName="secondCategory.categoryName"
                          :data-category2Id="secondCategory.categoryId"
                        >
                          {{ secondCategory.categoryName }}
                        </a>
                      </dt>
                      <dd>
                        <em
                          v-for="thirdCategory in secondCategory.categoryChild"
                          :key="thirdCategory.categoryId"
                        >
                          <a
                            href=""
                            :data-categoryName="thirdCategory.categoryName"
                            :data-category3Id="thirdCategory.categoryId"
                          >
                            {{ thirdCategory.categoryName }}
                          </a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "TypeNav",
  data() {
    return {
      isShow: true,
    };
  },
  computed: {
    ...mapState("home", ["categoryList"]),
  },
  methods: {
    enterShow() {
      this.isShow = true
    },
    leaveShow() {
      if (this.$route.path !== "/home") {
        this.isShow = false;
      }
    },
    goSearch(e) {
      let { categoryname, category1id, category2id, category3id } = e.target.dataset;
      if (categoryname) {
        let query = {};
        query.categoryName = categoryname;
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        this.$router.push({
          name:'search',
          query,
          params:this.$route.params
        });
      }
    },
  },
  mounted() {
    if (this.$route.path !== "/home") {
      this.isShow = false;
    }
  },
};
</script>

<style lang='less' scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 27px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22 px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
        .item:hover {
          background-color: skyblue;
        }
      }
    }
    .sort-enter {
      height: 0;
    }
    .sort-enter-to {
      height: 461px;
    }
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>