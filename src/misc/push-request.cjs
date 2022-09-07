/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.PushRequestOnlyPackage = (function() {

    /**
     * Namespace PushRequestOnlyPackage.
     * @exports PushRequestOnlyPackage
     * @namespace
     */
    var PushRequestOnlyPackage = {};

    PushRequestOnlyPackage.PushRequest = (function() {

        /**
         * Properties of a PushRequest.
         * @memberof PushRequestOnlyPackage
         * @interface IPushRequest
         * @property {Array.<logproto.IStreamAdapter>|null} [streams] PushRequest streams
         */

        /**
         * Constructs a new PushRequest.
         * @memberof PushRequestOnlyPackage
         * @classdesc Represents a PushRequest.
         * @implements IPushRequest
         * @constructor
         * @param {PushRequestOnlyPackage.IPushRequest=} [properties] Properties to set
         */
        function PushRequest(properties) {
            this.streams = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PushRequest streams.
         * @member {Array.<logproto.IStreamAdapter>} streams
         * @memberof PushRequestOnlyPackage.PushRequest
         * @instance
         */
        PushRequest.prototype.streams = $util.emptyArray;

        /**
         * Creates a new PushRequest instance using the specified properties.
         * @function create
         * @memberof PushRequestOnlyPackage.PushRequest
         * @static
         * @param {PushRequestOnlyPackage.IPushRequest=} [properties] Properties to set
         * @returns {PushRequestOnlyPackage.PushRequest} PushRequest instance
         */
        PushRequest.create = function create(properties) {
            return new PushRequest(properties);
        };

        /**
         * Encodes the specified PushRequest message. Does not implicitly {@link PushRequestOnlyPackage.PushRequest.verify|verify} messages.
         * @function encode
         * @memberof PushRequestOnlyPackage.PushRequest
         * @static
         * @param {PushRequestOnlyPackage.IPushRequest} message PushRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PushRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.streams != null && message.streams.length)
                for (var i = 0; i < message.streams.length; ++i)
                    $root.logproto.StreamAdapter.encode(message.streams[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PushRequest message, length delimited. Does not implicitly {@link PushRequestOnlyPackage.PushRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof PushRequestOnlyPackage.PushRequest
         * @static
         * @param {PushRequestOnlyPackage.IPushRequest} message PushRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PushRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PushRequest message from the specified reader or buffer.
         * @function decode
         * @memberof PushRequestOnlyPackage.PushRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PushRequestOnlyPackage.PushRequest} PushRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PushRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PushRequestOnlyPackage.PushRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.streams && message.streams.length))
                            message.streams = [];
                        message.streams.push($root.logproto.StreamAdapter.decode(reader, reader.uint32()));
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
         * @memberof PushRequestOnlyPackage.PushRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {PushRequestOnlyPackage.PushRequest} PushRequest
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
         * @memberof PushRequestOnlyPackage.PushRequest
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
                for (var i = 0; i < message.streams.length; ++i) {
                    var error = $root.logproto.StreamAdapter.verify(message.streams[i]);
                    if (error)
                        return "streams." + error;
                }
            }
            return null;
        };

        /**
         * Creates a PushRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PushRequestOnlyPackage.PushRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PushRequestOnlyPackage.PushRequest} PushRequest
         */
        PushRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.PushRequestOnlyPackage.PushRequest)
                return object;
            var message = new $root.PushRequestOnlyPackage.PushRequest();
            if (object.streams) {
                if (!Array.isArray(object.streams))
                    throw TypeError(".PushRequestOnlyPackage.PushRequest.streams: array expected");
                message.streams = [];
                for (var i = 0; i < object.streams.length; ++i) {
                    if (typeof object.streams[i] !== "object")
                        throw TypeError(".PushRequestOnlyPackage.PushRequest.streams: object expected");
                    message.streams[i] = $root.logproto.StreamAdapter.fromObject(object.streams[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PushRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PushRequestOnlyPackage.PushRequest
         * @static
         * @param {PushRequestOnlyPackage.PushRequest} message PushRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PushRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.streams = [];
            if (message.streams && message.streams.length) {
                object.streams = [];
                for (var j = 0; j < message.streams.length; ++j)
                    object.streams[j] = $root.logproto.StreamAdapter.toObject(message.streams[j], options);
            }
            return object;
        };

        /**
         * Converts this PushRequest to JSON.
         * @function toJSON
         * @memberof PushRequestOnlyPackage.PushRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PushRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PushRequest
         * @function getTypeUrl
         * @memberof PushRequestOnlyPackage.PushRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PushRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PushRequestOnlyPackage.PushRequest";
        };

        return PushRequest;
    })();

    return PushRequestOnlyPackage;
})();

$root.logproto = (function() {

    /**
     * Namespace logproto.
     * @exports logproto
     * @namespace
     */
    var logproto = {};

    logproto.StreamAdapter = (function() {

        /**
         * Properties of a StreamAdapter.
         * @memberof logproto
         * @interface IStreamAdapter
         * @property {string|null} [labels] StreamAdapter labels
         * @property {Array.<IntryAdapter>|null} [entries] StreamAdapter entries
         * @property {number|Long|null} [hash] StreamAdapter hash
         */

        /**
         * Constructs a new StreamAdapter.
         * @memberof logproto
         * @classdesc Represents a StreamAdapter.
         * @implements IStreamAdapter
         * @constructor
         * @param {logproto.IStreamAdapter=} [properties] Properties to set
         */
        function StreamAdapter(properties) {
            this.entries = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * StreamAdapter labels.
         * @member {string} labels
         * @memberof logproto.StreamAdapter
         * @instance
         */
        StreamAdapter.prototype.labels = "";

        /**
         * StreamAdapter entries.
         * @member {Array.<IntryAdapter>} entries
         * @memberof logproto.StreamAdapter
         * @instance
         */
        StreamAdapter.prototype.entries = $util.emptyArray;

        /**
         * StreamAdapter hash.
         * @member {number|Long} hash
         * @memberof logproto.StreamAdapter
         * @instance
         */
        StreamAdapter.prototype.hash = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new StreamAdapter instance using the specified properties.
         * @function create
         * @memberof logproto.StreamAdapter
         * @static
         * @param {logproto.IStreamAdapter=} [properties] Properties to set
         * @returns {logproto.StreamAdapter} StreamAdapter instance
         */
        StreamAdapter.create = function create(properties) {
            return new StreamAdapter(properties);
        };

        /**
         * Encodes the specified StreamAdapter message. Does not implicitly {@link logproto.StreamAdapter.verify|verify} messages.
         * @function encode
         * @memberof logproto.StreamAdapter
         * @static
         * @param {logproto.IStreamAdapter} message StreamAdapter message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StreamAdapter.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.labels != null && Object.hasOwnProperty.call(message, "labels"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.labels);
            if (message.entries != null && message.entries.length)
                for (var i = 0; i < message.entries.length; ++i)
                    $rootEntryAdapter.encode(message.entries[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.hash != null && Object.hasOwnProperty.call(message, "hash"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.hash);
            return writer;
        };

        /**
         * Encodes the specified StreamAdapter message, length delimited. Does not implicitly {@link logproto.StreamAdapter.verify|verify} messages.
         * @function encodeDelimited
         * @memberof logproto.StreamAdapter
         * @static
         * @param {logproto.IStreamAdapter} message StreamAdapter message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StreamAdapter.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a StreamAdapter message from the specified reader or buffer.
         * @function decode
         * @memberof logproto.StreamAdapter
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {logproto.StreamAdapter} StreamAdapter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StreamAdapter.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.logproto.StreamAdapter();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.labels = reader.string();
                        break;
                    }
                case 2: {
                        if (!(message.entries && message.entries.length))
                            message.entries = [];
                        message.entries.push($rootEntryAdapter.decode(reader, reader.uint32()));
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
         * @memberof logproto.StreamAdapter
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {logproto.StreamAdapter} StreamAdapter
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
         * @memberof logproto.StreamAdapter
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
                for (var i = 0; i < message.entries.length; ++i) {
                    var error = $rootEntryAdapter.verify(message.entries[i]);
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
         * @memberof logproto.StreamAdapter
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {logproto.StreamAdapter} StreamAdapter
         */
        StreamAdapter.fromObject = function fromObject(object) {
            if (object instanceof $root.logproto.StreamAdapter)
                return object;
            var message = new $root.logproto.StreamAdapter();
            if (object.labels != null)
                message.labels = String(object.labels);
            if (object.entries) {
                if (!Array.isArray(object.entries))
                    throw TypeError(".logproto.StreamAdapter.entries: array expected");
                message.entries = [];
                for (var i = 0; i < object.entries.length; ++i) {
                    if (typeof object.entries[i] !== "object")
                        throw TypeError(".logproto.StreamAdapter.entries: object expected");
                    message.entries[i] = $rootEntryAdapter.fromObject(object.entries[i]);
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
         * @memberof logproto.StreamAdapter
         * @static
         * @param {logproto.StreamAdapter} message StreamAdapter
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StreamAdapter.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.entries = [];
            if (options.defaults) {
                object.labels = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.hash = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.hash = options.longs === String ? "0" : 0;
            }
            if (message.labels != null && message.hasOwnProperty("labels"))
                object.labels = message.labels;
            if (message.entries && message.entries.length) {
                object.entries = [];
                for (var j = 0; j < message.entries.length; ++j)
                    object.entries[j] = $rootEntryAdapter.toObject(message.entries[j], options);
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
         * @memberof logproto.StreamAdapter
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        StreamAdapter.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for StreamAdapter
         * @function getTypeUrl
         * @memberof logproto.StreamAdapter
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        StreamAdapter.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/logproto.StreamAdapter";
        };

        return StreamAdapter;
    })();

    return logproto;
})();

module.exports = $root;
