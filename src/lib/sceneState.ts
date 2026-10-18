/**
 * Shared, mutable state that scroll triggers tween and the WebGL scene reads
 * every frame. Kept outside React so animation never causes a re-render.
 */
export const sceneState = {
  /** 0 = the V formation, 1 = the horizontal waveform field */
  morph: 0,
  /** how hard the ribbons move (0 to 1.6) */
  intensity: 0.45,
  /** extra Y rotation added by scroll (radians) */
  spin: 0,
  /** horizontal offset of the formation as a fraction of visible width */
  x: 0,
  /** vertical offset as a fraction of visible height */
  y: 0,
  /** scale multiplier */
  zoom: 1,
  /** global alpha */
  opacity: 1,
  /** smoothed scroll velocity, fed by Lenis */
  vel: 0,
};

export type SceneState = typeof sceneState;
