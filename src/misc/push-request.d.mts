import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace PushRequestPackage. */
export namespace PushRequestPackage {

    /** Properties of a PushRequest. */
    interface IPushRequest {

        /** PushRequest streams */
        streams?: (PushRequestPackage.IStreamAdapter[]|null);
    }

    /** Represents a PushRequest. */
    class PushRequest implements IPushRequest {

        /**
         * Constructs a new PushRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: PushRequestPackage.IPushRequest);

        /** PushRequest streams. */
        public streams: PushRequestPackage.IStreamAdapter[];

        /**
         * Creates a new PushRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PushRequest instance
         */
        public static create(properties?: PushRequestPackage.IPushRequest): PushRequestPackage.PushRequest;

        /**
         * Encodes the specified PushRequest message. Does not implicitly {@link PushRequestPackage.PushRequest.verify|verify} messages.
         * @param message PushRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: PushRequestPackage.IPushRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PushRequest message, length delimited. Does not implicitly {@link PushRequestPackage.PushRequest.verify|verify} messages.
         * @param message PushRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: PushRequestPackage.IPushRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PushRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PushRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PushRequestPackage.PushRequest;

        /**
         * Decodes a PushRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PushRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PushRequestPackage.PushRequest;

        /**
         * Verifies a PushRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PushRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PushRequest
         */
        public static fromObject(object: { [k: string]: any }): PushRequestPackage.PushRequest;

        /**
         * Creates a plain object from a PushRequest message. Also converts values to other types if specified.
         * @param message PushRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: PushRequestPackage.PushRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PushRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PushRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a StreamAdapter. */
    interface IStreamAdapter {

        /** StreamAdapter labels */
        labels?: (string|null);

        /** StreamAdapter entries */
        entries?: (PushRequestPackage.IEntryAdapter[]|null);

        /** StreamAdapter hash */
        hash?: (number|Long|null);
    }

    /** Represents a StreamAdapter. */
    class StreamAdapter implements IStreamAdapter {

        /**
         * Constructs a new StreamAdapter.
         * @param [properties] Properties to set
         */
        constructor(properties?: PushRequestPackage.IStreamAdapter);

        /** StreamAdapter labels. */
        public labels: string;

        /** StreamAdapter entries. */
        public entries: PushRequestPackage.IEntryAdapter[];

        /** StreamAdapter hash. */
        public hash: (number|Long);

        /**
         * Creates a new StreamAdapter instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StreamAdapter instance
         */
        public static create(properties?: PushRequestPackage.IStreamAdapter): PushRequestPackage.StreamAdapter;

        /**
         * Encodes the specified StreamAdapter message. Does not implicitly {@link PushRequestPackage.StreamAdapter.verify|verify} messages.
         * @param message StreamAdapter message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: PushRequestPackage.IStreamAdapter, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StreamAdapter message, length delimited. Does not implicitly {@link PushRequestPackage.StreamAdapter.verify|verify} messages.
         * @param message StreamAdapter message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: PushRequestPackage.IStreamAdapter, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StreamAdapter message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StreamAdapter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PushRequestPackage.StreamAdapter;

        /**
         * Decodes a StreamAdapter message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StreamAdapter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PushRequestPackage.StreamAdapter;

        /**
         * Verifies a StreamAdapter message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StreamAdapter message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StreamAdapter
         */
        public static fromObject(object: { [k: string]: any }): PushRequestPackage.StreamAdapter;

        /**
         * Creates a plain object from a StreamAdapter message. Also converts values to other types if specified.
         * @param message StreamAdapter
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: PushRequestPackage.StreamAdapter, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StreamAdapter to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for StreamAdapter
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an EntryAdapter. */
    interface IEntryAdapter {

        /** EntryAdapter timestamp */
        timestamp?: (google.protobuf.ITimestamp|null);

        /** EntryAdapter line */
        line?: (string|null);
    }

    /** Represents an EntryAdapter. */
    class EntryAdapter implements IEntryAdapter {

        /**
         * Constructs a new EntryAdapter.
         * @param [properties] Properties to set
         */
        constructor(properties?: PushRequestPackage.IEntryAdapter);

        /** EntryAdapter timestamp. */
        public timestamp?: (google.protobuf.ITimestamp|null);

        /** EntryAdapter line. */
        public line: string;

        /**
         * Creates a new EntryAdapter instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EntryAdapter instance
         */
        public static create(properties?: PushRequestPackage.IEntryAdapter): PushRequestPackage.EntryAdapter;

        /**
         * Encodes the specified EntryAdapter message. Does not implicitly {@link PushRequestPackage.EntryAdapter.verify|verify} messages.
         * @param message EntryAdapter message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: PushRequestPackage.IEntryAdapter, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EntryAdapter message, length delimited. Does not implicitly {@link PushRequestPackage.EntryAdapter.verify|verify} messages.
         * @param message EntryAdapter message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: PushRequestPackage.IEntryAdapter, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EntryAdapter message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EntryAdapter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PushRequestPackage.EntryAdapter;

        /**
         * Decodes an EntryAdapter message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EntryAdapter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PushRequestPackage.EntryAdapter;

        /**
         * Verifies an EntryAdapter message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EntryAdapter message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EntryAdapter
         */
        public static fromObject(object: { [k: string]: any }): PushRequestPackage.EntryAdapter;

        /**
         * Creates a plain object from an EntryAdapter message. Also converts values to other types if specified.
         * @param message EntryAdapter
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: PushRequestPackage.EntryAdapter, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EntryAdapter to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for EntryAdapter
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}

/** Namespace google. */
export namespace google {

    /** Namespace protobuf. */
    namespace protobuf {

        /** Properties of a Timestamp. */
        interface ITimestamp {

            /** Timestamp seconds */
            seconds?: (number|Long|null);

            /** Timestamp nanos */
            nanos?: (number|null);
        }

        /** Represents a Timestamp. */
        class Timestamp implements ITimestamp {

            /**
             * Constructs a new Timestamp.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.ITimestamp);

            /** Timestamp seconds. */
            public seconds: (number|Long);

            /** Timestamp nanos. */
            public nanos: number;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Timestamp instance
             */
            public static create(properties?: google.protobuf.ITimestamp): google.protobuf.Timestamp;

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @param message Timestamp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @param message Timestamp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Timestamp;

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Timestamp;

            /**
             * Verifies a Timestamp message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Timestamp
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Timestamp;

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @param message Timestamp
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Timestamp, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Timestamp to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Timestamp
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }
}
