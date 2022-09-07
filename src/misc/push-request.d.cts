import * as $protobuf from "protobufjs";
/** Namespace PushRequestOnlyPackage. */
export namespace PushRequestOnlyPackage {

    /** Properties of a PushRequest. */
    interface IPushRequest {

        /** PushRequest streams */
        streams?: (logproto.IStreamAdapter[]|null);
    }

    /** Represents a PushRequest. */
    class PushRequest implements IPushRequest {

        /**
         * Constructs a new PushRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: PushRequestOnlyPackage.IPushRequest);

        /** PushRequest streams. */
        public streams: logproto.IStreamAdapter[];

        /**
         * Creates a new PushRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PushRequest instance
         */
        public static create(properties?: PushRequestOnlyPackage.IPushRequest): PushRequestOnlyPackage.PushRequest;

        /**
         * Encodes the specified PushRequest message. Does not implicitly {@link PushRequestOnlyPackage.PushRequest.verify|verify} messages.
         * @param message PushRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: PushRequestOnlyPackage.IPushRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PushRequest message, length delimited. Does not implicitly {@link PushRequestOnlyPackage.PushRequest.verify|verify} messages.
         * @param message PushRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: PushRequestOnlyPackage.IPushRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PushRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PushRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PushRequestOnlyPackage.PushRequest;

        /**
         * Decodes a PushRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PushRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PushRequestOnlyPackage.PushRequest;

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
        public static fromObject(object: { [k: string]: any }): PushRequestOnlyPackage.PushRequest;

        /**
         * Creates a plain object from a PushRequest message. Also converts values to other types if specified.
         * @param message PushRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: PushRequestOnlyPackage.PushRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
}

/** Namespace logproto. */
export namespace logproto {

    /** Properties of a StreamAdapter. */
    interface IStreamAdapter {

        /** StreamAdapter labels */
        labels?: (string|null);

        /** StreamAdapter entries */
        entries?: (IntryAdapter[]|null);

        /** StreamAdapter hash */
        hash?: (number|Long|null);
    }

    /** Represents a StreamAdapter. */
    class StreamAdapter implements IStreamAdapter {

        /**
         * Constructs a new StreamAdapter.
         * @param [properties] Properties to set
         */
        constructor(properties?: logproto.IStreamAdapter);

        /** StreamAdapter labels. */
        public labels: string;

        /** StreamAdapter entries. */
        public entries: IntryAdapter[];

        /** StreamAdapter hash. */
        public hash: (number|Long);

        /**
         * Creates a new StreamAdapter instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StreamAdapter instance
         */
        public static create(properties?: logproto.IStreamAdapter): logproto.StreamAdapter;

        /**
         * Encodes the specified StreamAdapter message. Does not implicitly {@link logproto.StreamAdapter.verify|verify} messages.
         * @param message StreamAdapter message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: logproto.IStreamAdapter, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StreamAdapter message, length delimited. Does not implicitly {@link logproto.StreamAdapter.verify|verify} messages.
         * @param message StreamAdapter message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: logproto.IStreamAdapter, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StreamAdapter message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StreamAdapter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): logproto.StreamAdapter;

        /**
         * Decodes a StreamAdapter message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StreamAdapter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): logproto.StreamAdapter;

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
        public static fromObject(object: { [k: string]: any }): logproto.StreamAdapter;

        /**
         * Creates a plain object from a StreamAdapter message. Also converts values to other types if specified.
         * @param message StreamAdapter
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: logproto.StreamAdapter, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
}
