/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhn.com>
 * @fileoverview WaveDrawingMode class
 */
import DrawingMode from '../interface/drawingMode';
import {drawingModes, componentNames as components} from '../consts';

/**
 * WaveDrawingMode class
 * @class
 * @ignore
 */
class WaveDrawingMode extends DrawingMode {
    constructor() {
        super(drawingModes.WAVE_DRAWING);
    }

    /**
    * start this drawing mode
    * @param {Graphics} graphics - Graphics instance
    * @param {{width: ?number, color: ?string}} [options] - Brush width & color
    * @override
    */
    start(graphics, options) {
        const waveDrawing = graphics.getComponent(components.WAVE);
        waveDrawing.start(options);
    }

    /**
     * stop this drawing mode
     * @param {Graphics} graphics - Graphics instance
     * @override
     */
    end(graphics) {
        const waveDrawing = graphics.getComponent(components.WAVE);
        waveDrawing.end();
    }
}

export default WaveDrawingMode;
