import { SeotakeoffTrigger } from '../nodes/Seotakeoff/SeotakeoffTrigger.node';

describe('SeotakeoffTrigger Node', () => {
  let node: SeotakeoffTrigger;

  beforeEach(() => {
    node = new SeotakeoffTrigger();
  });

  describe('Node Metadata', () => {
    test('has correct name', () => {
      expect(node.description.name).toBe('seotakeoffTrigger');
    });

    test('has correct display name', () => {
      expect(node.description.displayName).toBe('SEOTakeoff Trigger');
    });

    test('has correct description', () => {
      expect(node.description.description).toBe('Starts workflow when SEOTakeoff events occur');
    });

    test('has correct icon', () => {
      expect(node.description.icon).toBe('file:seotakeoff.svg');
    });

    test('is a trigger node', () => {
      expect(node.description.group).toContain('trigger');
    });

    test('has version 1', () => {
      expect(node.description.version).toBe(1);
    });
  });

  describe('Polling Configuration', () => {
    test('is polling-based', () => {
      expect(node.description.polling).toBe(true);
    });

    test('has no inputs', () => {
      expect(node.description.inputs).toEqual([]);
    });

    test('has one output', () => {
      expect(node.description.outputs).toEqual(['main']);
    });
  });

  describe('Credentials', () => {
    test('requires seotakeoffApi credentials', () => {
      const creds = node.description.credentials;
      expect(creds).toContainEqual(
        expect.objectContaining({ name: 'seotakeoffApi', required: true })
      );
    });
  });

  describe('Events', () => {
    test('has articleReady event', () => {
      const eventProp = node.description.properties.find(p => p.name === 'event');
      const options = eventProp?.options as any[];
      expect(options).toContainEqual(expect.objectContaining({ value: 'articleReady' }));
    });

    test('has articlePublished event', () => {
      const eventProp = node.description.properties.find(p => p.name === 'event');
      const options = eventProp?.options as any[];
      expect(options).toContainEqual(expect.objectContaining({ value: 'articlePublished' }));
    });

    test('has articleFailed event', () => {
      const eventProp = node.description.properties.find(p => p.name === 'event');
      const options = eventProp?.options as any[];
      expect(options).toContainEqual(expect.objectContaining({ value: 'articleFailed' }));
    });

    test('has newCluster event', () => {
      const eventProp = node.description.properties.find(p => p.name === 'event');
      const options = eventProp?.options as any[];
      expect(options).toContainEqual(expect.objectContaining({ value: 'newCluster' }));
    });

    test('default event is articleReady', () => {
      const eventProp = node.description.properties.find(p => p.name === 'event');
      expect(eventProp?.default).toBe('articleReady');
    });

    test('event is required', () => {
      const eventProp = node.description.properties.find(p => p.name === 'event');
      expect(eventProp?.required).toBe(true);
    });
  });

  describe('Poll Method', () => {
    test('has poll method', () => {
      expect(node.poll).toBeDefined();
      expect(typeof node.poll).toBe('function');
    });
  });
});
