/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import $protobuf from "protobufjs/minimal.js";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const PushRequestPackage = $root.PushRequestPackage = (() => {

    /**
     * Namespace PushRequestPackage.
     * @exports PushRequestPackage
     * @namespace
     */
    const PushRequestPackage = {};

    PushRequestPackage.PushRequest = (function() {

        /**
         * Properties of a PushRequest.
         * @memberof PushRequestPackage
         * @interface IPushRequest
         * @property {Array.<PushRequestPackage.IStreamAdapter>|null} [streams] PushRequest streams
         */

        /**
         * Constructs a new PushRequest.
         * @memberof PushRequestPackage
         * @classdesc Represents a PushRequest.
         * @implements IPushRequest
         * @constructor
         * @param {PushRequestPackage.IPushRequest=} [properties] Properties to set
         */
        function PushRequest(properties) {
            this.streams = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PushRequest streams.
         * @member {Array.<PushRequestPackage.IStreamAdapter>} streams
         * @memberof PushRequestPackage.PushRequest
         * @instance
         */
        PushRequest.prototype.streams = $util.emptyArray;

        /**
         * Creates a new PushRequest instance using the specified properties.
         * @function create
         * @memberof PushRequestPackage.PushRequest
         * @static
         * @param {PushRequestPackage.IPushRequest=} [properties] Properties to set
         * @returns {PushRequestPackage.PushRequest} PushRequest instance
         */
        PushRequest.create = function create(properties) {
            return new PushRequest(properties);
        };

        /**
         * Encodes the specified PushRequest message. Does not implicitly {@link PushRequestPackage.PushRequest.verify|verify} messages.
         * @function encode
         * @memberof PushRequestPackage.PushRequest
         * @static
         * @param {PushRequestPackage.IPushRequest} message PushRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PushRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.streams != null && message.streams.length)
                for (let i = 0; i < message.streams.length; ++i)
                    $root.PushRequestPackage.StreamAdapter.encode(message.streams[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PushRequest message, length delimited. Does not implicitly {@link PushRequestPackage.PushRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof PushRequestPackage.PushRequest
         * @static
         * @param {PushRequestPackage.IPushRequest} message PushRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PushRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PushRequest message from the specified reader or buffer.
         * @function decode
         * @memberof PushRequestPackage.PushRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PushRequestPackage.PushRequest} PushRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PushRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PushRequestPackage.PushRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.streams && message.streams.length))
                            message.streams = [];
                        message.streams.push($root.PushRequestPackage.StreamAdapter.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PushRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof PushRequestPackage.PushRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {PushRequestPackage.PushRequest} PushRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PushRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PushRequest message.
         * @function verify
         * @memberof PushRequestPackage.PushRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PushRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.streams != null && message.hasOwnProperty("streams")) {
                if (!Array.isArray(message.streams))
                    return "streams: array expected";
                for (let i = 0; i < message.streams.length; ++i) {
                    let error = $root.PushRequestPackage.StreamAdapter.verify(message.streams[i]);
                    if (error)
                        return "streams." + error;
                }
            }
            return null;
        };

        /**
         * Creates a PushRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PushRequestPackage.PushRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PushRequestPackage.PushRequest} PushRequest
         */
        PushRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.PushRequestPackage.PushRequest)
                return object;
            let message = new $root.PushRequestPackage.PushRequest();
            if (object.streams) {
                if (!Array.isArray(object.streams))
                    throw TypeError(".PushRequestPackage.PushRequest.streams: array expected");
                message.streams = [];
                for (let i = 0; i < object.streams.length; ++i) {
                    if (typeof object.streams[i] !== "object")
                        throw TypeError(".PushRequestPackage.PushRequest.streams: object expected");
                    message.streams[i] = $root.PushRequestPackage.StreamAdapter.fromObject(object.streams[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PushRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PushRequestPackage.PushRequest
         * @static
         * @param {PushRequestPackage.PushRequest} message PushRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PushRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.streams = [];
            if (message.streams && message.streams.length) {
                object.streams = [];
                for (let j = 0; j < message.streams.length; ++j)
                    object.streams[j] = $root.PushRequestPackage.StreamAdapter.toObject(message.streams[j], options);
            }
            return object;
        };

        /**
         * Converts this PushRequest to JSON.
         * @function toJSON
         * @memberof PushRequestPackage.PushRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PushRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PushRequest
         * @function getTypeUrl
         * @memberof PushRequestPackage.PushRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PushRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PushRequestPackage.PushRequest";
        };

        return PushRequest;
    })();

    PushRequestPackage.StreamAdapter = (function() {

        /**
         * Properties of a StreamAdapter.
         * @memberof PushRequestPackage
         * @interface IStreamAdapter
         * @property {string|null} [labels] StreamAdapter labels
         * @property {Array.<PushRequestPackage.IEntryAdapter>|null} [entries] StreamAdapter entries
         * @property {number|Long|null} [hash] StreamAdapter hash
         */

        /**
         * Constructs a new StreamAdapter.
         * @memberof PushRequestPackage
         * @classdesc Represents a StreamAdapter.
         * @implements IStreamAdapter
         * @constructor
         * @param {PushRequestPackage.IStreamAdapter=} [properties] Properties to set
         */
        function StreamAdapter(properties) {
            this.entries = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * StreamAdapter labels.
         * @member {string} labels
         * @memberof PushRequestPackage.StreamAdapter
         * @instance
         */
        StreamAdapter.prototype.labels = "";

        /**
         * StreamAdapter entries.
         * @member {Array.<PushRequestPackage.IEntryAdapter>} entries
         * @memberof PushRequestPackage.StreamAdapter
         * @instance
         */
        StreamAdapter.prototype.entries = $util.emptyArray;

        /**
         * StreamAdapter hash.
         * @member {number|Long} hash
         * @memberof PushRequestPackage.StreamAdapter
         * @instance
         */
        StreamAdapter.prototype.hash = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new StreamAdapter instance using the specified properties.
         * @function create
         * @memberof PushRequestPackage.StreamAdapter
         * @static
         * @param {PushRequestPackage.IStreamAdapter=} [properties] Properties to set
         * @returns {PushRequestPackage.StreamAdapter} StreamAdapter instance
         */
        StreamAdapter.create = function create(properties) {
            return new StreamAdapter(properties);
        };

        /**
         * Encodes the specified StreamAdapter message. Does not implicitly {@link PushRequestPackage.StreamAdapter.verify|verify} messages.
         * @function encode
         * @memberof PushRequestPackage.StreamAdapter
         * @static
         * @param {PushRequestPackage.IStreamAdapter} message StreamAdapter message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StreamAdapter.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.labels != null && Object.hasOwnProperty.call(message, "labels"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.labels);
            if (message.entries != null && message.entries.length)
                for (let i = 0; i < message.entries.length; ++i)
                    $root.PushRequestPackage.EntryAdapter.encode(message.entries[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.hash != null && Object.hasOwnProperty.call(message, "hash"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.hash);
            return writer;
        };

        /**
         * Encodes the specified StreamAdapter message, length delimited. Does not implicitly {@link PushRequestPackage.StreamAdapter.verify|verify} messages.
         * @function encodeDelimited
         * @memberof PushRequestPackage.StreamAdapter
         * @static
         * @param {PushRequestPackage.IStreamAdapter} message StreamAdapter message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StreamAdapter.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a StreamAdapter message from the specified reader or buffer.
         * @function decode
         * @memberof PushRequestPackage.StreamAdapter
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PushRequestPackage.StreamAdapter} StreamAdapter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StreamAdapter.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PushRequestPackage.StreamAdapter();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.labels = reader.string();
                        break;
                    }
                case 2: {
                        if (!(message.entries && message.entries.length))
                            message.entries = [];
                        message.entries.push($root.PushRequestPackage.EntryAdapter.decode(reader, reader.uint32()));
                        break;
                    }
                case 3: {
                        message.hash = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a StreamAdapter message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof PushRequestPackage.StreamAdapter
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {PushRequestPackage.StreamAdapter} StreamAdapter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StreamAdapter.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a StreamAdapter message.
         * @function verify
         * @memberof PushRequestPackage.StreamAdapter
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        StreamAdapter.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.labels != null && message.hasOwnProperty("labels"))
                if (!$util.isString(message.labels))
                    return "labels: string expected";
            if (message.entries != null && message.hasOwnProperty("entries")) {
                if (!Array.isArray(message.entries))
                    return "entries: array expected";
                for (let i = 0; i < message.entries.length; ++i) {
                    let error = $root.PushRequestPackage.EntryAdapter.verify(message.entries[i]);
                    if (error)
                        return "entries." + error;
                }
            }
            if (message.hash != null && message.hasOwnProperty("hash"))
                if (!$util.isInteger(message.hash) && !(message.hash && $util.isInteger(message.hash.low) && $util.isInteger(message.hash.high)))
                    return "hash: integer|Long expected";
            return null;
        };

        /**
         * Creates a StreamAdapter message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PushRequestPackage.StreamAdapter
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PushRequestPackage.StreamAdapter} StreamAdapter
         */
        StreamAdapter.fromObject = function fromObject(object) {
            if (object instanceof $root.PushRequestPackage.StreamAdapter)
                return object;
            let message = new $root.PushRequestPackage.StreamAdapter();
            if (object.labels != null)
                message.labels = String(object.labels);
            if (object.entries) {
                if (!Array.isArray(object.entries))
                    throw TypeError(".PushRequestPackage.StreamAdapter.entries: array expected");
                message.entries = [];
                for (let i = 0; i < object.entries.length; ++i) {
                    if (typeof object.entries[i] !== "object")
                        throw TypeError(".PushRequestPackage.StreamAdapter.entries: object expected");
                    message.entries[i] = $root.PushRequestPackage.EntryAdapter.fromObject(object.entries[i]);
                }
            }
            if (object.hash != null)
                if ($util.Long)
                    (message.hash = $util.Long.fromValue(object.hash)).unsigned = true;
                else if (typeof object.hash === "string")
                    message.hash = parseInt(object.hash, 10);
                else if (typeof object.hash === "number")
                    message.hash = object.hash;
                else if (typeof object.hash === "object")
                    message.hash = new $util.LongBits(object.hash.low >>> 0, object.hash.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a StreamAdapter message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PushRequestPackage.StreamAdapter
         * @static
         * @param {PushRequestPackage.StreamAdapter} message StreamAdapter
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StreamAdapter.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.entries = [];
            if (options.defaults) {
                object.labels = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.hash = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.hash = options.longs === String ? "0" : 0;
            }
            if (message.labels != null && message.hasOwnProperty("labels"))
                object.labels = message.labels;
            if (message.entries && message.entries.length) {
                object.entries = [];
                for (let j = 0; j < message.entries.length; ++j)
                    object.entries[j] = $root.PushRequestPackage.EntryAdapter.toObject(message.entries[j], options);
            }
            if (message.hash != null && message.hasOwnProperty("hash"))
                if (typeof message.hash === "number")
                    object.hash = options.longs === String ? String(message.hash) : message.hash;
                else
                    object.hash = options.longs === String ? $util.Long.prototype.toString.call(message.hash) : options.longs === Number ? new $util.LongBits(message.hash.low >>> 0, message.hash.high >>> 0).toNumber(true) : message.hash;
            return object;
        };

        /**
         * Converts this StreamAdapter to JSON.
         * @function toJSON
         * @memberof PushRequestPackage.StreamAdapter
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        StreamAdapter.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for StreamAdapter
         * @function getTypeUrl
         * @memberof PushRequestPackage.StreamAdapter
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        StreamAdapter.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PushRequestPackage.StreamAdapter";
        };

        return StreamAdapter;
    })();

    PushRequestPackage.EntryAdapter = (function() {

        /**
         * Properties of an EntryAdapter.
         * @memberof PushRequestPackage
         * @interface IEntryAdapter
         * @property {google.protobuf.ITimestamp|null} [timestamp] EntryAdapter timestamp
         * @property {string|null} [line] EntryAdapter line
         */

        /**
         * Constructs a new EntryAdapter.
         * @memberof PushRequestPackage
         * @classdesc Represents an EntryAdapter.
         * @implements IEntryAdapter
         * @constructor
         * @param {PushRequestPackage.IEntryAdapter=} [properties] Properties to set
         */
        function EntryAdapter(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EntryAdapter timestamp.
         * @member {google.protobuf.ITimestamp|null|undefined} timestamp
         * @memberof PushRequestPackage.EntryAdapter
         * @instance
         */
        EntryAdapter.prototype.timestamp = null;

        /**
         * EntryAdapter line.
         * @member {string} line
         * @memberof PushRequestPackage.EntryAdapter
         * @instance
         */
        EntryAdapter.prototype.line = "";

        /**
         * Creates a new EntryAdapter instance using the specified properties.
         * @function create
         * @memberof PushRequestPackage.EntryAdapter
         * @static
         * @param {PushRequestPackage.IEntryAdapter=} [properties] Properties to set
         * @returns {PushRequestPackage.EntryAdapter} EntryAdapter instance
         */
        EntryAdapter.create = function create(properties) {
            return new EntryAdapter(properties);
        };

        /**
         * Encodes the specified EntryAdapter message. Does not implicitly {@link PushRequestPackage.EntryAdapter.verify|verify} messages.
         * @function encode
         * @memberof PushRequestPackage.EntryAdapter
         * @static
         * @param {PushRequestPackage.IEntryAdapter} message EntryAdapter message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EntryAdapter.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                $root.google.protobuf.Timestamp.encode(message.timestamp, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.line != null && Object.hasOwnProperty.call(message, "line"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.line);
            return writer;
        };

        /**
         * Encodes the specified EntryAdapter message, length delimited. Does not implicitly {@link PushRequestPackage.EntryAdapter.verify|verify} messages.
         * @function encodeDelimited
         * @memberof PushRequestPackage.EntryAdapter
         * @static
         * @param {PushRequestPackage.IEntryAdapter} message EntryAdapter message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EntryAdapter.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EntryAdapter message from the specified reader or buffer.
         * @function decode
         * @memberof PushRequestPackage.EntryAdapter
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PushRequestPackage.EntryAdapter} EntryAdapter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EntryAdapter.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PushRequestPackage.EntryAdapter();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.timestamp = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                        break;
                    }
                case 2: {
                        message.line = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EntryAdapter message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof PushRequestPackage.EntryAdapter
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {PushRequestPackage.EntryAdapter} EntryAdapter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EntryAdapter.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EntryAdapter message.
         * @function verify
         * @memberof PushRequestPackage.EntryAdapter
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EntryAdapter.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.timestamp != null && message.hasOwnProperty("timestamp")) {
                let error = $root.google.protobuf.Timestamp.verify(message.timestamp);
                if (error)
                    return "timestamp." + error;
            }
            if (message.line != null && message.hasOwnProperty("line"))
                if (!$util.isString(message.line))
                    return "line: string expected";
            return null;
        };

        /**
         * Creates an EntryAdapter message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PushRequestPackage.EntryAdapter
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PushRequestPackage.EntryAdapter} EntryAdapter
         */
        EntryAdapter.fromObject = function fromObject(object) {
            if (object instanceof $root.PushRequestPackage.EntryAdapter)
                return object;
            let message = new $root.PushRequestPackage.EntryAdapter();
            if (object.timestamp != null) {
                if (typeof object.timestamp !== "object")
                    throw TypeError(".PushRequestPackage.EntryAdapter.timestamp: object expected");
                message.timestamp = $root.google.protobuf.Timestamp.fromObject(object.timestamp);
            }
            if (object.line != null)
                message.line = String(object.line);
            return message;
        };

        /**
         * Creates a plain object from an EntryAdapter message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PushRequestPackage.EntryAdapter
         * @static
         * @param {PushRequestPackage.EntryAdapter} message EntryAdapter
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EntryAdapter.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.timestamp = null;
                object.line = "";
            }
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                object.timestamp = $root.google.protobuf.Timestamp.toObject(message.timestamp, options);
            if (message.line != null && message.hasOwnProperty("line"))
                object.line = message.line;
            return object;
        };

        /**
         * Converts this EntryAdapter to JSON.
         * @function toJSON
         * @memberof PushRequestPackage.EntryAdapter
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EntryAdapter.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for EntryAdapter
         * @function getTypeUrl
         * @memberof PushRequestPackage.EntryAdapter
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        EntryAdapter.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PushRequestPackage.EntryAdapter";
        };

        return EntryAdapter;
    })();

    return PushRequestPackage;
})();

export const google = $root.google = (() => {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    const google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        const protobuf = {};

        protobuf.Timestamp = (function() {

            /**
             * Properties of a Timestamp.
             * @memberof google.protobuf
             * @interface ITimestamp
             * @property {number|Long|null} [seconds] Timestamp seconds
             * @property {number|null} [nanos] Timestamp nanos
             */

            /**
             * Constructs a new Timestamp.
             * @memberof google.protobuf
             * @classdesc Represents a Timestamp.
             * @implements ITimestamp
             * @constructor
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             */
            function Timestamp(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Timestamp seconds.
             * @member {number|Long} seconds
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Timestamp nanos.
             * @member {number} nanos
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.nanos = 0;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             * @returns {google.protobuf.Timestamp} Timestamp instance
             */
            Timestamp.create = function create(properties) {
                return new Timestamp(properties);
            };

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.seconds != null && Object.hasOwnProperty.call(message, "seconds"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.seconds);
                if (message.nanos != null && Object.hasOwnProperty.call(message, "nanos"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.nanos);
                return writer;
            };

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Timestamp();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.seconds = reader.int64();
                            break;
                        }
                    case 2: {
                            message.nanos = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Timestamp message.
             * @function verify
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Timestamp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (!$util.isInteger(message.seconds) && !(message.seconds && $util.isInteger(message.seconds.low) && $util.isInteger(message.seconds.high)))
                        return "seconds: integer|Long expected";
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    if (!$util.isInteger(message.nanos))
                        return "nanos: integer expected";
                return null;
            };

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Timestamp} Timestamp
             */
            Timestamp.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Timestamp)
                    return object;
                let message = new $root.google.protobuf.Timestamp();
                if (object.seconds != null)
                    if ($util.Long)
                        (message.seconds = $util.Long.fromValue(object.seconds)).unsigned = false;
                    else if (typeof object.seconds === "string")
                        message.seconds = parseInt(object.seconds, 10);
                    else if (typeof object.seconds === "number")
                        message.seconds = object.seconds;
                    else if (typeof object.seconds === "object")
                        message.seconds = new $util.LongBits(object.seconds.low >>> 0, object.seconds.high >>> 0).toNumber();
                if (object.nanos != null)
                    message.nanos = object.nanos | 0;
                return message;
            };

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.Timestamp} message Timestamp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Timestamp.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.seconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.seconds = options.longs === String ? "0" : 0;
                    object.nanos = 0;
                }
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (typeof message.seconds === "number")
                        object.seconds = options.longs === String ? String(message.seconds) : message.seconds;
                    else
                        object.seconds = options.longs === String ? $util.Long.prototype.toString.call(message.seconds) : options.longs === Number ? new $util.LongBits(message.seconds.low >>> 0, message.seconds.high >>> 0).toNumber() : message.seconds;
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    object.nanos = message.nanos;
                return object;
            };

            /**
             * Converts this Timestamp to JSON.
             * @function toJSON
             * @memberof google.protobuf.Timestamp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Timestamp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Timestamp
             * @function getTypeUrl
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Timestamp.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/google.protobuf.Timestamp";
            };

            return Timestamp;
        })();

        return protobuf;
    })();

    return google;
})();

export { $root as default };
