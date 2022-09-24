export interface Scenes {
  [scene: string]: {
    length: number;
    data?: Record<string, string>[];
  };
}

export default {
  resolution: {
    width: 1920,
    height: 1080
  },
  framerate: 60,
  scenes: {
    TestScene: {
      length: 3,
      data: [{ name: 'James Camilleri', age: '30' }]
    }
  }
};
