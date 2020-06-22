(function(global) {
    if (fabric.WaveLine) {
        fabric.warn('fabric.WaveLine is already defined.');

        return;
    }
    fabric.WaveLine = fabric.util.createClass(fabric.Line, {
        type: 'line_with_arrow',

        initialize(element, options) {
            options || (options = {});
            this.callSuper('initialize', element, options);

            // Set default options
            this.set({
                hasBorders: false,
                hasControls: false
            });
        },

        _render(ctx) {
            // this.callSuper('_render', ctx);
            ctx.save();
            const xDiff = this.x2 - this.x1;
            const yDiff = this.y2 - this.y1;
            const angle = Math.atan2(yDiff, xDiff);
            ctx.translate(xDiff / 2, yDiff / 2);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.closePath();
            ctx.fillStyle = this.stroke;
            ctx.fill();
            ctx.restore();
            const p = this.calcLinePoints();
            const point = this.pointOnLine(this.point(p.x2, p.y2), this.point(p.x1, p.y1), 10);
            this.wavy(this.point(p.x1, p.y1), point, this.point(p.x2, p.y2), ctx);
            ctx.stroke();
        },

        point(x, y) {
            return {
                x,
                y
            };
        },

        wavy(from, to, endPoint, ctx) {
            let cx = 0,
                cy = 0,
                fx = from.x,
                fy = from.y,
                tx = to.x,
                ty = to.y,
                i = 0,
                step = 4,
                waveOffsetLength = 0,

                ang = Math.atan2(ty - fy, tx - fx),
                distance = Math.sqrt((fx - tx) * (fx - tx) + (fy - ty) * (fy - ty)),
                amplitude = -10,
                f = Math.PI * distance / 30;

            for (i; i <= distance; i += step) {
                waveOffsetLength = Math.sin((i / distance) * f) * amplitude;
                cx = from.x + Math.cos(ang) * i + Math.cos(ang - Math.PI / 2) * waveOffsetLength;
                cy = from.y + Math.sin(ang) * i + Math.sin(ang - Math.PI / 2) * waveOffsetLength;
                i > 0 ? ctx.lineTo(cx, cy) : ctx.moveTo(cx, cy);
            }
            ctx.lineTo(to.x, to.y);
            // ctx.lineTo(endPoint.x, endPoint.y);
        },

        pointOnLine(point1, point2, dist) {
            const len = Math.sqrt(((point2.x - point1.x) * (point2.x - point1.x)) + ((point2.y - point1.y) * (point2.y - point1.y)));
            const t = (dist) / len;
            let x3 = ((1 - t) * point1.x) + (t * point2.x),
                y3 = ((1 - t) * point1.y) + (t * point2.y);

            return new fabric.Point(x3, y3);
        },

        toObject() {
            return fabric.util.object.extend(this.callSuper('toObject'), {
                customProps: this.customProps
            });
        }
    });
})(typeof exports !== 'undefined' ? exports : this);
