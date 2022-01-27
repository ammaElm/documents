<script>
import * as d3 from 'd3';
import { defineComponent, h } from 'vue';

const DragLine = defineComponent({
  props: {
    id: {
      type: Number || String,
      required: true,
    },
    mode: {
      type: String,
      required: false,
      default: 'row', // 'col'
    },
    offset: {
      type: Object,
      required: false,
      default: function () {
        return {
          X: 0,
          Y: 0,
        };
      }, // 针对main的位置偏移
    },
    length: {
      type: Number,
      required: false,
      default: 200, // 拖拽线段长度
    },
    hotRange: {
      type: Number,
      required: false,
      default: 14, // 热区宽度
    },
    doms: {
      type: Array,
      required: false,
      default: function () {
        return [];
      },
    },
    minOffset: {
      type: Number,
      required: false,
      default: 100, // 可拖拽最小距离
    },
    maxOffset: {
      type: Number,
      required: false,
      default: 0, // 可拖拽最da距离
    },
  },
  data() {
    return {
      dragging: false,
      prePoint: null,
      delta: null, // 拖拽变化量
      mindelta: 0,
    };
  },
  computed: {
    min() {
      // TO DO
      return this.minOffset;
    },
    max() {
      // TO DO
      return this.maxOffset;
    },
    vNodes() {
      let { X, Y } = this.offset;

      return this.doms.map((dom) => {
        let trend = null;
        let { originTop, originLeft } = dom.domInfo;
        if (this.mode === 'row') {
          // console.log('trend', Y, originTop);
          trend = originTop < Y ? 'reduced' : 'added';
        } else {
          // console.log('trend', X, originLeft);
          trend = originLeft < X ? 'reduced' : 'added';
        }
        return { ...dom, trend };
      });
    },
    dragLineStyle() {
      let { X, Y } = this.offset;
      return {
        width: this.mode === 'row' ? `${this.length}px` : `${this.hotRange}px`,
        height: this.mode === 'row' ? `${this.hotRange}px` : `${this.length}px`,
        left: `${X}px`,
        top: `${Y}px`,
        cursor: this.mode === 'row' ? 'row-resize' : 'col-resize',
        transform: this.mode === 'row' ? 'translateY(-50%)' : 'translateX(-50%)',
      };
    },
  },
  emits: ['dragStart', 'dragEnd', 'resize'],
  mounted() {
    let _this = this;
    this.$nextTick(() => {
      let node = this.$el;
      d3.select(node).call(
        d3
          .drag()
          .on('start', function () {
            let e = d3.event;
            _this.handleDragStart(e);
          })
          .on('end', function () {
            let e = d3.event;
            _this.handleDragEnd(e);
          })
          .on('drag', function () {
            let e = d3.event;
            _this.handleDrag(e);
          })
      );
    });
  },
  methods: {
    handleDrag(e) {
      let { x, y } = e;
      if (this.dragging) {
        if (this.mode === 'row') {
          if (y < this.min + this.mindelta) {
            return;
          }
          if (y > this.max - this.mindelta) {
            return;
          }
          this.delta = y - this.prePoint.y;
        } else {
          if (x < this.min + this.mindelta) {
            return;
          }
          if (x > this.max - this.mindelta) {
            return;
          }
          this.delta = x - this.prePoint.x;
        }

        let current = this.calVNodes();
        this.$emit('resize', current);
      }
    },
    handleDragStart(e) {
      // e.dataTransfer.dropEffect = 'copy';
      // e.dataTransfer.effectAllowed = 'copy';
      let { x, y } = e;
      console.log('start');
      this.prePoint = { x, y };
      this.dragging = true;
      this.$emit('dragStart');
    },
    handleDragEnd() {
      this.dragging = false;
      console.log('end');
      let current = this.calVNodes();
      // this.$emit('resize', current);
      this.$emit('dragEnd', current);
      // this.$el.style.background = 'rgba(255,255,255,0.2)';
    },
    calDragLineLocation() {
      let { X, Y } = this.offset;
      let left, top;
      if (this.mode === 'row') {
        top = Y + this.delta;
        left = X;
      } else {
        top = Y;
        left = X + this.delta;
      }
      return { top, left };
    },
    calVNodes() {
      let tmpVNodes = [];
      this.vNodes.map((vNode) => {
        let dragLineId = this.id;
        let { domInfo, trend } = vNode;
        let { originTop, originLeft, originWidth, originHeight } = domInfo;
        let height, width, left, top;
        // let delta = position === 'top' || position === 'left' ? this.delta : -this.delta;
        // console.log(this.delta);
        let delta = trend === 'reduced' ? this.delta : -this.delta;
        if (originWidth <= 32 || originHeight <= 32) {
          height = Math.floor(originHeight);
          top = Math.floor(originTop);
          left = Math.floor(originLeft);
          width = Math.floor(originWidth);
        } else {
          if (this.mode === 'row') {
            height = Math.floor(originHeight + delta);
            top = Math.floor(originTop + delta);

            left = Math.floor(originLeft);
            width = Math.floor(originWidth);
          } else {
            width = Math.floor(originWidth + delta);
            left = Math.floor(originLeft + delta);

            height = Math.floor(originHeight);
            top = Math.floor(originTop);
          }
        }

        tmpVNodes.push({ dragLineId, ...vNode, width, height, left, top });
      });
      return tmpVNodes;
    },
    handleMouseup(e) {
      console.log('mouse up', e);
    },
  },
  render() {
    return h('div', {
      draggable: true,
      class: 'drag-line',
      style: this.dragLineStyle,
      onmouseup: this.handleMouseup,
    });
  },
});

export default DragLine;
</script>

<style lang="less" scoped>
.drag-line {
  position: absolute;
  // background: rgba(255, 255, 255, 0.4);
  z-index: 1023;
}

</style>