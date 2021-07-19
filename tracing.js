/* tracing.js */

// Require dependencies
const { NodeTracerProvider } = require("@opentelemetry/node");
const { SimpleSpanProcessor, ConsoleSpanExporter } = require("@opentelemetry/tracing");
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');

// Create a tracer provider
const provider = new NodeTracerProvider();

// The exporter handles sending spans to your tracing backend
const exporter = new ConsoleSpanExporter();

// The simple span processor sends spans to the exporter as soon as they are ended.
const processor = new SimpleSpanProcessor(exporter);
provider.addSpanProcessor(processor);

// The provider must be registered in order to
// be used by the OpenTelemetry API and instrumentations
provider.register();

// This will automatically enable all instrumentations
registerInstrumentations({
    instrumentations: [getNodeAutoInstrumentations()],
});