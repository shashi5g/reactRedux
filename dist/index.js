module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "82e30fd3984159d933c0";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://0.0.0.0:3030/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _defineProperty; });\nfunction _defineProperty(obj, key, value) {\n  if (key in obj) {\n    Object.defineProperty(obj, key, {\n      value: value,\n      enumerable: true,\n      configurable: true,\n      writable: true\n    });\n  } else {\n    obj[key] = value;\n  }\n\n  return obj;\n}\n\n//# sourceURL=webpack:///./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty.js?");

/***/ }),

/***/ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/interopRequireWildcard.js":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/interopRequireWildcard.js ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _interopRequireWildcard; });\nfunction _interopRequireWildcard(obj) {\n  if (obj && obj.__esModule) {\n    return obj;\n  } else {\n    var newObj = {};\n\n    if (obj != null) {\n      for (var key in obj) {\n        if (Object.prototype.hasOwnProperty.call(obj, key)) {\n          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};\n\n          if (desc.get || desc.set) {\n            Object.defineProperty(newObj, key, desc);\n          } else {\n            newObj[key] = obj[key];\n          }\n        }\n      }\n    }\n\n    newObj[\"default\"] = obj;\n    return newObj;\n  }\n}\n\n//# sourceURL=webpack:///./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/interopRequireWildcard.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return '@media ' + item[2] + '{' + content + '}';\n      } else {\n        return content;\n      }\n    }).join('');\n  }; // import a list of modules into the list\n\n\n  list.i = function (modules, mediaQuery) {\n    if (typeof modules === 'string') {\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    for (var i = 0; i < this.length; i++) {\n      var id = this[i][0];\n\n      if (id != null) {\n        alreadyImportedModules[id] = true;\n      }\n    }\n\n    for (i = 0; i < modules.length; i++) {\n      var item = modules[i]; // skip already imported module\n      // this implementation is not 100% perfect for weird media query combinations\n      // when a module is imported multiple times with different media queries.\n      // I hope this will never occur (Hey this way we have smaller bundles)\n\n      if (item[0] == null || !alreadyImportedModules[item[0]]) {\n        if (mediaQuery && !item[2]) {\n          item[2] = mediaQuery;\n        } else if (mediaQuery) {\n          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';\n        }\n\n        list.push(item);\n      }\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || '';\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;\n  return '/*# ' + data + ' */';\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!*****************************************!*\
  !*** (webpack)/hot/log-apply-result.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\nmodule.exports = function (updatedModules, renewedModules) {\n  var unacceptedModules = updatedModules.filter(function (moduleId) {\n    return renewedModules && renewedModules.indexOf(moduleId) < 0;\n  });\n\n  var log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\n  if (unacceptedModules.length > 0) {\n    log(\"warning\", \"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)\");\n    unacceptedModules.forEach(function (moduleId) {\n      log(\"warning\", \"[HMR]  - \" + moduleId);\n    });\n  }\n\n  if (!renewedModules || renewedModules.length === 0) {\n    log(\"info\", \"[HMR] Nothing hot updated.\");\n  } else {\n    log(\"info\", \"[HMR] Updated modules:\");\n    renewedModules.forEach(function (moduleId) {\n      if (typeof moduleId === \"string\" && moduleId.indexOf(\"!\") !== -1) {\n        var parts = moduleId.split(\"!\");\n        log.groupCollapsed(\"info\", \"[HMR]  - \" + parts.pop());\n        log(\"info\", \"[HMR]  - \" + moduleId);\n        log.groupEnd(\"info\");\n      } else {\n        log(\"info\", \"[HMR]  - \" + moduleId);\n      }\n    });\n    var numberIds = renewedModules.every(function (moduleId) {\n      return typeof moduleId === \"number\";\n    });\n    if (numberIds) log(\"info\", \"[HMR] Consider using the NamedModulesPlugin for module names.\");\n  }\n};\n\n//# sourceURL=webpack:///(webpack)/hot/log-apply-result.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!****************************!*\
  !*** (webpack)/hot/log.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var logLevel = \"info\";\n\nfunction dummy() {}\n\nfunction shouldLog(level) {\n  var shouldLog = logLevel === \"info\" && level === \"info\" || [\"info\", \"warning\"].indexOf(logLevel) >= 0 && level === \"warning\" || [\"info\", \"warning\", \"error\"].indexOf(logLevel) >= 0 && level === \"error\";\n  return shouldLog;\n}\n\nfunction logGroup(logFn) {\n  return function (level, msg) {\n    if (shouldLog(level)) {\n      logFn(msg);\n    }\n  };\n}\n\nmodule.exports = function (level, msg) {\n  if (shouldLog(level)) {\n    if (level === \"info\") {\n      console.log(msg);\n    } else if (level === \"warning\") {\n      console.warn(msg);\n    } else if (level === \"error\") {\n      console.error(msg);\n    }\n  }\n};\n/* eslint-disable node/no-unsupported-features/node-builtins */\n\n\nvar group = console.group || dummy;\nvar groupCollapsed = console.groupCollapsed || dummy;\nvar groupEnd = console.groupEnd || dummy;\n/* eslint-enable node/no-unsupported-features/node-builtins */\n\nmodule.exports.group = logGroup(group);\nmodule.exports.groupCollapsed = logGroup(groupCollapsed);\nmodule.exports.groupEnd = logGroup(groupEnd);\n\nmodule.exports.setLogLevel = function (level) {\n  logLevel = level;\n};\n\nmodule.exports.formatError = function (err) {\n  var message = err.message;\n  var stack = err.stack;\n\n  if (!stack) {\n    return message;\n  } else if (stack.indexOf(message) < 0) {\n    return message + \"\\n\" + stack;\n  } else {\n    return stack;\n  }\n};\n\n//# sourceURL=webpack:///(webpack)/hot/log.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/poll.js?100":
/*!*********************************!*\
  !*** (webpack)/hot/poll.js?100 ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\n/*globals __resourceQuery */\nif (true) {\n  var hotPollInterval = +__resourceQuery.substr(1) || 10 * 60 * 1000;\n\n  var log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\n  var checkForUpdate = function checkForUpdate(fromUpdate) {\n    if (module.hot.status() === \"idle\") {\n      module.hot.check(true).then(function (updatedModules) {\n        if (!updatedModules) {\n          if (fromUpdate) log(\"info\", \"[HMR] Update applied.\");\n          return;\n        }\n\n        __webpack_require__(/*! ./log-apply-result */ \"./node_modules/webpack/hot/log-apply-result.js\")(updatedModules, updatedModules);\n\n        checkForUpdate(true);\n      }).catch(function (err) {\n        var status = module.hot.status();\n\n        if ([\"abort\", \"fail\"].indexOf(status) >= 0) {\n          log(\"warning\", \"[HMR] Cannot apply update.\");\n          log(\"warning\", \"[HMR] \" + log.formatError(err));\n          log(\"warning\", \"[HMR] You need to restart the application!\");\n        } else {\n          log(\"warning\", \"[HMR] Update failed: \" + log.formatError(err));\n        }\n      });\n    }\n  };\n\n  setInterval(checkForUpdate, hotPollInterval);\n} else {}\n/* WEBPACK VAR INJECTION */}.call(this, \"?100\"))\n\n//# sourceURL=webpack:///(webpack)/hot/poll.js?");

/***/ }),

/***/ "./src/App.css":
/*!*********************!*\
  !*** ./src/App.css ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \".app {\\n  margin: 50px 30px;\\n}\\nli{\\n  list-style: none;\\n}\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/App.css?");

/***/ }),

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Users_shakumar16_Desktop_Training_reactRedux_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_interopRequireWildcard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/interopRequireWildcard */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/interopRequireWildcard.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router */ \"react-router\");\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./App.css */ \"./src/App.css\");\n/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_App_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _AsynRoute__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AsynRoute */ \"./src/AsynRoute.js\");\n\nvar _jsxFileName = \"/Users/shakumar16/Desktop/Training/reactRedux/src/App.js\";\n\n\n\n\n\nfunction App() {\n  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_2__[\"Switch\"], {\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 11\n    },\n    __self: this\n  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n    className: \"app\",\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 12\n    },\n    __self: this\n  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_2__[\"Route\"], {\n    exact: true,\n    path: \"/\",\n    component: props => react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_AsynRoute__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n      props: props,\n      loadingPromise: Promise.resolve().then(() => Object(_Users_shakumar16_Desktop_Training_reactRedux_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_interopRequireWildcard__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(__webpack_require__(/*! ./containers/CharacterList/CharactersList */ \"./src/containers/CharacterList/CharactersList.jsx\"))),\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 13\n      },\n      __self: this\n    }),\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 13\n    },\n    __self: this\n  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_2__[\"Route\"], {\n    exact: true,\n    path: \"/search\",\n    component: props => react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_AsynRoute__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n      props: props,\n      loadingPromise: Promise.resolve().then(() => Object(_Users_shakumar16_Desktop_Training_reactRedux_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_interopRequireWildcard__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(__webpack_require__(/*! ./containers/CharacterList/CharactersList */ \"./src/containers/CharacterList/CharactersList.jsx\"))),\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 15\n      },\n      __self: this\n    }),\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 15\n    },\n    __self: this\n  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_2__[\"Route\"], {\n    path: \"/search/:name\",\n    component: props => {\n      const match = props.match;\n      const selectedShow = match.params.name;\n      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_AsynRoute__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n        loadingPromise: Promise.resolve().then(() => Object(_Users_shakumar16_Desktop_Training_reactRedux_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_interopRequireWildcard__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(__webpack_require__(/*! ./containers/Search/Search */ \"./src/containers/Search/Search.jsx\"))),\n        props: Object.assign({\n          selectedShow\n        }, props),\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 22\n        },\n        __self: this\n      });\n    },\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 16\n    },\n    __self: this\n  })));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);\n\n//# sourceURL=webpack:///./src/App.js?");

/***/ }),

/***/ "./src/AsynRoute.js":
/*!**************************!*\
  !*** ./src/AsynRoute.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nvar _jsxFileName = \"/Users/shakumar16/Desktop/Training/reactRedux/src/AsynRoute.js\";\n\n\nclass AsyncRoute extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  constructor(...args) {\n    super(...args);\n    this.state = {\n      loaded: false\n    };\n  }\n\n  componentDidMount() {\n    this.props.loadingPromise.then(module => {\n      this.component = module.default;\n      this.setState({\n        loaded: true\n      });\n    });\n  }\n\n  render() {\n    if (this.state.loaded) {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.component, Object.assign({}, this.props, {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 19\n        },\n        __self: this\n      }));\n    }\n\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\", {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 21\n      },\n      __self: this\n    }, 'loader');\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (AsyncRoute);\n\n//# sourceURL=webpack:///./src/AsynRoute.js?");

/***/ }),

/***/ "./src/components/CharactersListComp.jsx":
/*!***********************************************!*\
  !*** ./src/components/CharactersListComp.jsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _SearchAndSorting_SearchAndSorting__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SearchAndSorting/SearchAndSorting */ \"./src/components/SearchAndSorting/SearchAndSorting.jsx\");\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.css */ \"./src/components/index.css\");\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_2__);\nvar _jsxFileName = \"/Users/shakumar16/Desktop/Training/reactRedux/src/components/CharactersListComp.jsx\";\n\n\n\n\nclass CharactersListComp extends react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent {\n  constructor(props) {\n    super(props);\n\n    this.sortByIdAsc = () => {\n      let sortedProductsAsc;\n      sortedProductsAsc = this.props.character.results.sort((a, b) => {\n        return parseInt(a.id) - parseInt(b.id);\n      });\n      console.log(sortedProductsAsc);\n      this.props.loadList(sortedProductsAsc);\n    };\n\n    this.sortByIdDsc = () => {\n      let sortedProductsAsc;\n      sortedProductsAsc = this.props.character.results.sort((a, b) => {\n        return parseInt(b.id) - parseInt(a.id);\n      });\n      this.props.loadList(sortedProductsAsc);\n    };\n\n    this.state = {\n      character: {\n        results: []\n      }\n    };\n    this.sortingBy = this.sortingBy.bind(this); // this.filterByName = this.filterByName.bind(this)\n  }\n\n  componentWillReceiveProps(nextProps) {\n    if (this.props !== nextProps) {\n      const character = nextProps.character;\n      this.setState({\n        character: character\n      });\n    }\n  }\n\n  sortingBy(value) {\n    if (value === 'ascending') {\n      this.sortByIdAsc();\n    } else if (value === 'descending') {\n      this.sortByIdDsc();\n    }\n  }\n\n  createdDate(date) {\n    const dateCreated = new Date(date);\n    const dateNow = new Date();\n    const diffYear = dateNow.getFullYear() - dateCreated.getFullYear();\n    let createdDateString = '';\n\n    if (diffYear >= 0) {\n      createdDateString = \"\".concat(diffYear, \" years ago\");\n    } else {\n      createdDateString = \"\".concat(diffYear, \" years later\");\n    }\n\n    return createdDateString;\n  }\n\n  render() {\n    const character = this.state.character;\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 72\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SearchAndSorting_SearchAndSorting__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n      sortingBy: this.sortingBy,\n      filterByName: this.filterByName,\n      loadList: this.props.loadList,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 73\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\", {\n      className: \"flex-wrapper\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 74\n      },\n      __self: this\n    }, character.results.length > 0 ? character.results.map((item, key) => {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", {\n        key: item.id,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 78\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"card\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 79\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n        src: item.image,\n        alt: item.name,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 80\n        },\n        __self: this\n      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"card-title\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 81\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\", {\n        key: item.name + item.id,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 82\n        },\n        __self: this\n      }, item.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 83\n        },\n        __self: this\n      }, \"id \", item.id, \"-\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 83\n        },\n        __self: this\n      }, \" created \", this.createdDate(item.created)))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\", {\n        className: \"card-desc\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 87\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 88\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 88\n        },\n        __self: this\n      }, \"status \"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 88\n        },\n        __self: this\n      }, item.status)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 89\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 89\n        },\n        __self: this\n      }, \"species \"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 89\n        },\n        __self: this\n      }, item.species)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 90\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 90\n        },\n        __self: this\n      }, \"gender\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 90\n        },\n        __self: this\n      }, item.gender)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 91\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 91\n        },\n        __self: this\n      }, \"rigin \"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 91\n        },\n        __self: this\n      }, item.location && item.origin.name)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 92\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 92\n        },\n        __self: this\n      }, \"last location \"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 92\n        },\n        __self: this\n      }, item.location && item.location.name))));\n    }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\", {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 95\n      },\n      __self: this\n    }, 'Not found any name with this keyword')));\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (CharactersListComp);\n\n//# sourceURL=webpack:///./src/components/CharactersListComp.jsx?");

/***/ }),

/***/ "./src/components/FilterByAttribute/FilterByAttribute.jsx":
/*!****************************************************************!*\
  !*** ./src/components/FilterByAttribute/FilterByAttribute.jsx ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router */ \"react-router\");\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.css */ \"./src/components/FilterByAttribute/style.css\");\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_2__);\nvar _jsxFileName = \"/Users/shakumar16/Desktop/Training/reactRedux/src/components/FilterByAttribute/FilterByAttribute.jsx\";\n\n\n\n\nclass FilterByAttribute extends react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent {\n  constructor(props) {\n    super(props);\n    this.state = {\n      filterList: []\n    };\n    this.handleFilterBrand = this.handleFilterBrand.bind(this);\n  }\n\n  componentDidMount() {\n    this.setState((state, props) => ({\n      filterList: props.filterList\n    }));\n  }\n\n  handleFilterBrand(e) {\n    const name = e.target.name;\n    const isChecked = e.target.checked;\n    this.setState({\n      [name]: isChecked\n    });\n    const filterList = this.props.filterList;\n    const filterListCont = filterList && filterList.filter(item => {\n      if (item && item.name === name) {\n        item.isChecked = e.target.checked;\n      }\n\n      return item;\n    });\n\n    if (e.target.checked) {\n      this.props.setCheckbox(filterListCont);\n    } else {\n      this.props.removeCheckbox(filterList);\n    }\n  }\n\n  renderFilter(filtertype) {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: filtertype[0].type.toLowerCase(),\n      key: Math.random(),\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 42\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\", {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 43\n      },\n      __self: this\n    }, filtertype[0].type), filtertype.length && filtertype.map((item, i) => {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n        htmlFor: item.name,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 45\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n        type: \"checkbox\",\n        name: item.name,\n        id: item.name,\n        value: item.name,\n        checked: item.isChecked,\n        onChange: e => this.handleFilterBrand(e),\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 46\n        },\n        __self: this\n      }), item.label);\n    }));\n  }\n\n  render() {\n    const filterList = this.state.filterList;\n    const species = filterList && filterList.filter(item => {\n      return item && item.type === 'Species';\n    });\n    const gender = filterList && filterList.filter(item => {\n      return item && item.type === 'Gender';\n    });\n    const origin = filterList && filterList.filter(item => {\n      return item && item.type === 'Origin';\n    });\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 65\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h2\", {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 66\n      },\n      __self: this\n    }, \"Filter\"), species.length > 0 && this.renderFilter(species), gender.length > 0 && this.renderFilter(gender), origin.length > 0 && this.renderFilter(origin));\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_router__WEBPACK_IMPORTED_MODULE_1__[\"withRouter\"])(FilterByAttribute));\n\n//# sourceURL=webpack:///./src/components/FilterByAttribute/FilterByAttribute.jsx?");

/***/ }),

/***/ "./src/components/FilterByAttribute/style.css":
/*!****************************************************!*\
  !*** ./src/components/FilterByAttribute/style.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"h2{\\n    margin-bottom: 15px;\\n}\\n.left h3{\\n    display: block;\\n    font-size: 24px;\\n    font-weight: 500;\\n    line-height: 1.5;\\n    margin-bottom: 8px;\\n    color: black;\\n}\\n.species,.gender,.origin{\\n    padding: 20px;\\n    border: 1px solid gray;\\n    margin-bottom: 30px;\\n}\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/components/FilterByAttribute/style.css?");

/***/ }),

/***/ "./src/components/SearchAndSorting/SearchAndSorting.jsx":
/*!**************************************************************!*\
  !*** ./src/components/SearchAndSorting/SearchAndSorting.jsx ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router */ \"react-router\");\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.css */ \"./src/components/SearchAndSorting/style.css\");\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_2__);\nvar _jsxFileName = \"/Users/shakumar16/Desktop/Training/reactRedux/src/components/SearchAndSorting/SearchAndSorting.jsx\";\n\n\n\n\nclass SearchAndSorting extends react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent {\n  constructor(props) {\n    super(props);\n    this.state = {\n      sortingOption: [],\n      searchValue: \"\",\n      selectedValue: \"\"\n    };\n    this.handleChange = this.handleChange.bind(this);\n    this.filterByInput = this.filterByInput.bind(this);\n  }\n\n  componentDidMount() {\n    this.setState({\n      sortingOption: [{\n        id: \"\",\n        name: \"Sort By Id\"\n      }, {\n        id: \"ascending\",\n        name: \"Ascending\"\n      }, {\n        id: \"descending\",\n        name: \"Descending\"\n      }]\n    });\n  }\n\n  handleChange(event) {\n    const target = event.target;\n    const name = target.name;\n    this.setState({\n      [name]: target.value\n    });\n\n    if (name === \"sorting\") {\n      this.setState({\n        selectedValue: event.target.value\n      });\n      this.props.sortingBy(event.target.value);\n    }\n\n    if (name === \"search\") {\n      this.setState({\n        searchValue: event.target.value\n      });\n    }\n  }\n\n  filterByInput(event) {\n    event.preventDefault();\n    const searchValue = this.state.searchValue;\n    this.props.history.push(\"/search/\".concat(searchValue));\n  }\n\n  render() {\n    const sortingOption = this.state.sortingOption;\n    let sortingOptList = sortingOption.length > 0 && sortingOption.map((item, i) => {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", {\n        key: i,\n        value: item.id,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 53\n        },\n        __self: this\n      }, item.name);\n    }, this);\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"search-sort\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 61\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"form\", {\n      onSubmit: this.filterByInput,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 63\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 64\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 65\n      },\n      __self: this\n    }, \"Search By Name \"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n      type: \"text\",\n      name: \"search\",\n      value: this.state.value,\n      onChange: this.handleChange,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 66\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n      type: \"submit\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 73\n      },\n      __self: this\n    }, \"Search\"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"select\", {\n      value: this.state.value,\n      name: \"sorting\",\n      onChange: this.handleChange,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 77\n      },\n      __self: this\n    }, sortingOptList));\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_router__WEBPACK_IMPORTED_MODULE_1__[\"withRouter\"])(SearchAndSorting));\n\n//# sourceURL=webpack:///./src/components/SearchAndSorting/SearchAndSorting.jsx?");

/***/ }),

/***/ "./src/components/SearchAndSorting/style.css":
/*!***************************************************!*\
  !*** ./src/components/SearchAndSorting/style.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \".search-sort{\\n    display: flex;\\n    margin-bottom: 30px;\\n}\\nform{\\n    ms-flex: 1 1 auto;\\n    flex: 1 1 auto;\\n}\\nlabel{\\n    display: block;\\n    font-size: 18px;\\n    font-weight: 500;\\n    line-height: 1.5;\\n    margin-bottom: 8px;\\n}\\ninput,select{\\n    font-size: 18px;\\n    font-weight: 500;\\n    line-height: 1.5;\\n    padding: 5px;\\n    outline: none;\\n    width: 100%;\\n    max-width: 250px;\\n}\\ninput[type='checkbox']{\\n    width:40px;\\n}\\nbutton{\\n    font-size: 18px;\\n    font-weight: 500;\\n    line-height: 1.5;\\n    padding: 5px;\\n    outline: none;\\n    background: #efefef;\\n    border: 1px solid  #efefef;\\n}\\nselect{\\n    align-self: flex-end;\\n    height: 50px;\\n}\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/components/SearchAndSorting/style.css?");

/***/ }),

/***/ "./src/components/SelectedFilter/SelectedFilter.jsx":
/*!**********************************************************!*\
  !*** ./src/components/SelectedFilter/SelectedFilter.jsx ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.css */ \"./src/components/SelectedFilter/style.css\");\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_1__);\nvar _jsxFileName = \"/Users/shakumar16/Desktop/Training/reactRedux/src/components/SelectedFilter/SelectedFilter.jsx\";\n\n\n\nclass SelectedFilter extends react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent {\n  constructor(props) {\n    super(props);\n    this.state = {\n      filterData: []\n    };\n    this.removeFilter = this.removeFilter.bind(this);\n  }\n\n  componentWillReceiveProps(nextProps) {\n    this.setState((state, props) => ({\n      filterData: props.filterData\n    }));\n  }\n\n  removeFilter(event) {\n    const target = event.target;\n    const parentNode = target.parentNode;\n    const remove = parentNode.children[0].innerText;\n    const filterData = this.props.filterData;\n    const filterList = filterData.filter(item => {\n      if (item && item.name === remove) {\n        item.isChecked = false;\n        return item;\n      }\n\n      return '';\n    });\n    this.props.removeFiterItem(filterList);\n  }\n\n  render() {\n    const filterData = this.state.filterData;\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 40\n      },\n      __self: this\n    }, filterData && filterData.length ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"selected-list\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 42\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h2\", {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 43\n      },\n      __self: this\n    }, \"Selected Filters\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\", {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 44\n      },\n      __self: this\n    }, filterData.map(item => {\n      return item && item.isChecked && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", {\n        className: \"selectedItem\",\n        key: item.name,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 47\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 48\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 49\n        },\n        __self: this\n      }, item.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n        onClick: e => this.removeFilter(e),\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 50\n        },\n        __self: this\n      }, \"X\")));\n    }))) : '');\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (SelectedFilter);\n\n//# sourceURL=webpack:///./src/components/SelectedFilter/SelectedFilter.jsx?");

/***/ }),

/***/ "./src/components/SelectedFilter/style.css":
/*!*************************************************!*\
  !*** ./src/components/SelectedFilter/style.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \".selected-list {\\n    margin-bottom: 20px;\\n}\\n.selected-list ul{\\n    display: flex;\\n    flex-direction: row;\\n}\\n.selectedItem{\\n    background: rgba(0,0,0,.5);\\n    padding: 10px;\\n    margin-right: 10px;\\n    border-radius: 10px;\\n}\\n.selectedItem span{\\n    color:white\\n}\\n.selectedItem button {\\n    background: none;\\n    border: none;\\n    color: white;\\n    font-weight: 600;\\n}\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/components/SelectedFilter/style.css?");

/***/ }),

/***/ "./src/components/index.css":
/*!**********************************!*\
  !*** ./src/components/index.css ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"* {\\n    box-sizing: border-box;\\n    margin: 0;\\n    padding: 0;\\n  }\\n  img{\\n      width: 100%;\\n      max-width:100%;\\n  }\\n  .plp{\\n      width: 100%;\\n      display: flex\\n  }\\n  .left{\\n  \\n      width: 20%;\\n    padding-right: 50px;\\n  }\\n  .right{\\n      width: 80%;\\n  }\\n  .flex-wrapper {\\n    display: flex;\\n    flex-wrap: wrap;\\n    background:rgba(0,0,0, .5);\\n    padding: 10px;\\n  }\\n  \\n  .flex-wrapper img{\\n\\n    display: block;\\n    border-radius: 10px 10px 0 0;\\n  }\\n  .flex-wrapper > li {\\n    width: 100%;\\n    max-width: 25%;\\n    padding: 10px;\\n    /* border: 1px solid pink; */\\n    list-style: none;\\n  }\\n\\n  h3{\\n    font-size: 30px;\\n    font-weight: 500;\\n    line-height: 1.5;\\n    margin-bottom: 8px;\\n    color: #fff\\n}\\nspan{\\n    font-size: 15px;\\n    line-height: 1.5;\\n    margin-bottom: 8px;\\n    color: #fff;\\n}\\n.card{\\n  position: relative;\\n}\\n\\n.card-title{\\n  position: absolute;\\n  padding:10px;\\n  opacity: .5;\\n  bottom: 0;\\n  width: 100%;\\n  background: rgba(0,0,0,.7);\\n\\n}\\n.card-desc{\\n  background: rgba(0,0,0,.6);\\n  padding-top: 20px;\\n  padding-bottom: 30px;\\n  border-radius: 0 0 10px 10px;\\n  min-height: 300px;\\n}\\n\\n.card-desc li {\\n  list-style: none;\\n  padding: 10px;\\n  border-bottom: 1px solid rgba(0,0,0,.7);\\n  display: flex;\\n}\\n.card-desc li span{\\n  color:orange\\n}\\n.card-desc li span:first-child {\\n text-transform: uppercase;\\n flex: 1 1 0;\\n color: white;\\n}\\n.card-desc li span{\\n  margin-bottom: 0;\\n}\\n.card-desc li:last-child{\\n  border-bottom: 0;\\n}\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/components/index.css?");

/***/ }),

/***/ "./src/containers/CharacterList/CharactersList.jsx":
/*!*********************************************************!*\
  !*** ./src/containers/CharacterList/CharactersList.jsx ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _selector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./selector */ \"./src/containers/CharacterList/selector.js\");\n/* harmony import */ var _action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./action */ \"./src/containers/CharacterList/action.js\");\n/* harmony import */ var _Filters_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Filters/action */ \"./src/containers/Filters/action.js\");\n/* harmony import */ var _common_Layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/Layout */ \"./src/containers/common/Layout.jsx\");\nvar _jsxFileName = \"/Users/shakumar16/Desktop/Training/reactRedux/src/containers/CharacterList/CharactersList.jsx\";\n\n\n\n\n\n // import icons from 'glyphicons'\n\nclass CharactersList extends react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent {\n  constructor(props) {\n    super(props);\n    this.state = {};\n  }\n\n  componentDidMount() {\n    fetch(\"https://rickandmortyapi.com/api/character/\").then(response => response.json()).then(data => {\n      this.props.loadList(data);\n    }).catch(error => this.setState({\n      error,\n      isLoading: false\n    }));\n  }\n\n  render() {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_Layout__WEBPACK_IMPORTED_MODULE_5__[\"default\"], Object.assign({}, this.props, {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 29\n      },\n      __self: this\n    }));\n  }\n\n}\n\nconst mapDispatchToProps = (dispatch, ownProps) => {\n  return {\n    loadList: data => {\n      dispatch(Object(_action__WEBPACK_IMPORTED_MODULE_3__[\"loadCharacterList\"])(data));\n    },\n    removeFiterItem: data => {\n      dispatch(Object(_Filters_action__WEBPACK_IMPORTED_MODULE_4__[\"removeCheckboxFilter\"])(data));\n    }\n  };\n};\n\nconst mapStateToProps = state => {\n  return {\n    character: Object(_selector__WEBPACK_IMPORTED_MODULE_2__[\"getCharacter\"])(state),\n    filters: Object(_selector__WEBPACK_IMPORTED_MODULE_2__[\"getFilterLIst\"])(state)\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(mapStateToProps, mapDispatchToProps)(CharactersList));\n\n//# sourceURL=webpack:///./src/containers/CharacterList/CharactersList.jsx?");

/***/ }),

/***/ "./src/containers/CharacterList/action.js":
/*!************************************************!*\
  !*** ./src/containers/CharacterList/action.js ***!
  \************************************************/
/*! exports provided: loadCharacterList, sortedById */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadCharacterList\", function() { return loadCharacterList; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sortedById\", function() { return sortedById; });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./src/containers/CharacterList/constants.js\");\n\nconst loadCharacterList = payload => {\n  return {\n    type: _constants__WEBPACK_IMPORTED_MODULE_0__[\"LOAD_CHRACTER_LIST\"],\n    payload\n  };\n};\nconst sortedById = payload => {\n  return {\n    type: _constants__WEBPACK_IMPORTED_MODULE_0__[\"SORT_BY_PRICE\"],\n    payload\n  };\n};\n\n//# sourceURL=webpack:///./src/containers/CharacterList/action.js?");

/***/ }),

/***/ "./src/containers/CharacterList/constants.js":
/*!***************************************************!*\
  !*** ./src/containers/CharacterList/constants.js ***!
  \***************************************************/
/*! exports provided: LOAD_CHRACTER_LIST, SORT_BY_PRICE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LOAD_CHRACTER_LIST\", function() { return LOAD_CHRACTER_LIST; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SORT_BY_PRICE\", function() { return SORT_BY_PRICE; });\nconst LOAD_CHRACTER_LIST = \"LOAD_CHRACTER_LIST\";\nconst SORT_BY_PRICE = 'SORT_BY_PRICE';\n\n//# sourceURL=webpack:///./src/containers/CharacterList/constants.js?");

/***/ }),

/***/ "./src/containers/CharacterList/reducer.js":
/*!*************************************************!*\
  !*** ./src/containers/CharacterList/reducer.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./src/containers/CharacterList/constants.js\");\n\nconst initialState = {\n  info: {\n    \"count\": 0,\n    \"pages\": 0,\n    \"next\": \"\",\n    \"prev\": \"\"\n  },\n  results: [{}]\n};\n\nconst characterList = (state = initialState, action) => {\n  switch (action.type) {\n    case _constants__WEBPACK_IMPORTED_MODULE_0__[\"LOAD_CHRACTER_LIST\"]:\n      return Object.assign({}, state, action.payload);\n\n    case _constants__WEBPACK_IMPORTED_MODULE_0__[\"SORT_BY_PRICE\"]:\n      //sort by price\n      return Object.assign({}, state, action.payload);\n\n    default:\n      return state;\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (characterList);\n\n//# sourceURL=webpack:///./src/containers/CharacterList/reducer.js?");

/***/ }),

/***/ "./src/containers/CharacterList/selector.js":
/*!**************************************************!*\
  !*** ./src/containers/CharacterList/selector.js ***!
  \**************************************************/
/*! exports provided: getCharacter, getFilterLIst */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getCharacter\", function() { return getCharacter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getFilterLIst\", function() { return getFilterLIst; });\nconst getCharacter = (state, props) => state.characterList;\nconst getFilterLIst = (state, props) => state.filters;\n\n//# sourceURL=webpack:///./src/containers/CharacterList/selector.js?");

/***/ }),

/***/ "./src/containers/Filters/Filters.jsx":
/*!********************************************!*\
  !*** ./src/containers/Filters/Filters.jsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_FilterByAttribute_FilterByAttribute__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/FilterByAttribute/FilterByAttribute */ \"./src/components/FilterByAttribute/FilterByAttribute.jsx\");\n/* harmony import */ var _action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./action */ \"./src/containers/Filters/action.js\");\n/* harmony import */ var _selector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./selector */ \"./src/containers/Filters/selector.js\");\nvar _jsxFileName = \"/Users/shakumar16/Desktop/Training/reactRedux/src/containers/Filters/Filters.jsx\";\n\n\n\n\n\n\nclass Filters extends react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent {\n  constructor(props) {\n    super(props);\n    this.state = {};\n  }\n\n  render() {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_FilterByAttribute_FilterByAttribute__WEBPACK_IMPORTED_MODULE_2__[\"default\"], Object.assign({}, this.props, {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 14\n      },\n      __self: this\n    }));\n  }\n\n}\n\nconst mapDispatchToProps = (dispatch, ownProps) => {\n  return {\n    setCheckbox: data => {\n      dispatch(Object(_action__WEBPACK_IMPORTED_MODULE_3__[\"setCheckboxFilter\"])(data));\n    },\n    removeCheckbox: data => dispatch(Object(_action__WEBPACK_IMPORTED_MODULE_3__[\"removeCheckboxFilter\"])(data))\n  };\n};\n\nconst mapStateToProps = state => {\n  return {\n    filterList: Object(_selector__WEBPACK_IMPORTED_MODULE_4__[\"getFilterLIst\"])(state)\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(mapStateToProps, mapDispatchToProps)(Filters));\n\n//# sourceURL=webpack:///./src/containers/Filters/Filters.jsx?");

/***/ }),

/***/ "./src/containers/Filters/action.js":
/*!******************************************!*\
  !*** ./src/containers/Filters/action.js ***!
  \******************************************/
/*! exports provided: setTextFilter, setCheckboxFilter, removeCheckboxFilter, updateFilterList, clearFilters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setTextFilter\", function() { return setTextFilter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setCheckboxFilter\", function() { return setCheckboxFilter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"removeCheckboxFilter\", function() { return removeCheckboxFilter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateFilterList\", function() { return updateFilterList; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"clearFilters\", function() { return clearFilters; });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./src/containers/Filters/constants.js\");\n\nconst setTextFilter = data => ({\n  type: _constants__WEBPACK_IMPORTED_MODULE_0__[\"SET_TEXT_FILTER\"],\n  data\n});\nconst setCheckboxFilter = name => ({\n  type: _constants__WEBPACK_IMPORTED_MODULE_0__[\"SET_CHECKBOX_FILTER\"],\n  name\n});\nconst removeCheckboxFilter = name => ({\n  type: _constants__WEBPACK_IMPORTED_MODULE_0__[\"REMOVE_CHECKBOX_FILTER\"],\n  name\n});\nconst updateFilterList = data => ({\n  type: _constants__WEBPACK_IMPORTED_MODULE_0__[\"SET_FILTER_LIST\"],\n  data\n});\nconst clearFilters = () => ({\n  type: _constants__WEBPACK_IMPORTED_MODULE_0__[\"CLEAR_FILTERS\"]\n});\n\n//# sourceURL=webpack:///./src/containers/Filters/action.js?");

/***/ }),

/***/ "./src/containers/Filters/constants.js":
/*!*********************************************!*\
  !*** ./src/containers/Filters/constants.js ***!
  \*********************************************/
/*! exports provided: SET_TEXT_FILTER, SET_CHECKBOX_FILTER, REMOVE_CHECKBOX_FILTER, CLEAR_FILTERS, SET_FILTER_LIST */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SET_TEXT_FILTER\", function() { return SET_TEXT_FILTER; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SET_CHECKBOX_FILTER\", function() { return SET_CHECKBOX_FILTER; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"REMOVE_CHECKBOX_FILTER\", function() { return REMOVE_CHECKBOX_FILTER; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CLEAR_FILTERS\", function() { return CLEAR_FILTERS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SET_FILTER_LIST\", function() { return SET_FILTER_LIST; });\nconst SET_TEXT_FILTER = \"SET_TEXT_FILTER\";\nconst SET_CHECKBOX_FILTER = 'SET_CHECKBOX_FILTER';\nconst REMOVE_CHECKBOX_FILTER = 'REMOVE_CHECKBOX_FILTER';\nconst CLEAR_FILTERS = 'CLEAR_FILTERS';\nconst SET_FILTER_LIST = 'SET_FILTER_LIST';\n\n//# sourceURL=webpack:///./src/containers/Filters/constants.js?");

/***/ }),

/***/ "./src/containers/Filters/reducer.js":
/*!*******************************************!*\
  !*** ./src/containers/Filters/reducer.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Users_shakumar16_Desktop_Training_reactRedux_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ \"./src/containers/Filters/constants.js\");\n\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { Object(_Users_shakumar16_Desktop_Training_reactRedux_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\n\nconst checkboxes = [{\n  name: \"human\",\n  key: \"human\",\n  label: \"Human\",\n  isChecked: true,\n  type: 'Species'\n}, {\n  name: \"mythology\",\n  key: \"mythology\",\n  label: \"Mythology\",\n  isChecked: false,\n  type: 'Species'\n}, {\n  name: \"otherspecies\",\n  key: \"otherspecies\",\n  label: \"Other Species\",\n  isChecked: false,\n  type: 'Species'\n}, {\n  name: \"male\",\n  key: \"male\",\n  label: \"Male\",\n  isChecked: false,\n  type: 'Gender'\n}, {\n  name: \"female\",\n  key: \"female\",\n  label: \"Female\",\n  isChecked: false,\n  type: 'Gender'\n}, {\n  name: \"unknown\",\n  key: \"unknown\",\n  label: \"Unknown\",\n  isChecked: false,\n  type: 'Origin'\n}, {\n  name: \"PostApoCalypticEarth\",\n  key: \"PostApoCalypticEarth\",\n  label: \"Post ApoCalyptic Earth\",\n  isChecked: false,\n  type: 'Origin'\n}, {\n  name: \"Nuptia4\",\n  key: \"Nuptia4\",\n  label: \"Nuptia 4\",\n  isChecked: false,\n  type: 'Origin'\n}, {\n  name: \"otherOrigins\",\n  key: \"otherOrigins\",\n  label: \"Other Origins\",\n  isChecked: false,\n  type: 'Origin'\n}];\nconst filtersReducerDefaultState = {\n  filterList: checkboxes,\n  filterData: []\n};\n\nconst filters = (state = filtersReducerDefaultState, action) => {\n  switch (action.type) {\n    case _constants__WEBPACK_IMPORTED_MODULE_1__[\"SET_TEXT_FILTER\"]:\n      return _objectSpread({}, state, {\n        name: action.name\n      });\n\n    case _constants__WEBPACK_IMPORTED_MODULE_1__[\"SET_CHECKBOX_FILTER\"]:\n      return _objectSpread({}, state, {\n        filterList: [...state.filterList, action.data]\n      });\n\n    case _constants__WEBPACK_IMPORTED_MODULE_1__[\"REMOVE_CHECKBOX_FILTER\"]:\n      return _objectSpread({}, state, {\n        filterList: [...state.filterList, action.data]\n      });\n\n    case _constants__WEBPACK_IMPORTED_MODULE_1__[\"CLEAR_FILTERS\"]:\n      return _objectSpread({}, state, {\n        filterData: []\n      });\n\n    default:\n      return state;\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (filters);\n\n//# sourceURL=webpack:///./src/containers/Filters/reducer.js?");

/***/ }),

/***/ "./src/containers/Filters/selector.js":
/*!********************************************!*\
  !*** ./src/containers/Filters/selector.js ***!
  \********************************************/
/*! exports provided: getFilterLIst */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getFilterLIst\", function() { return getFilterLIst; });\nconst getFilterLIst = (state, props) => state.filters.filterList;\n\n//# sourceURL=webpack:///./src/containers/Filters/selector.js?");

/***/ }),

/***/ "./src/containers/Search/Search.jsx":
/*!******************************************!*\
  !*** ./src/containers/Search/Search.jsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _CharacterList_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../CharacterList/action */ \"./src/containers/CharacterList/action.js\");\n/* harmony import */ var _CharacterList_selector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../CharacterList/selector */ \"./src/containers/CharacterList/selector.js\");\n/* harmony import */ var _common_Layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/Layout */ \"./src/containers/common/Layout.jsx\");\n/* harmony import */ var _Filters_action__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Filters/action */ \"./src/containers/Filters/action.js\");\nvar _jsxFileName = \"/Users/shakumar16/Desktop/Training/reactRedux/src/containers/Search/Search.jsx\";\n\n\n\n\n\n\n // import icons from 'glyphicons'\n\nclass Search extends react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent {\n  constructor(props) {\n    super(props);\n    this.state = {};\n    this.renderData = this.renderData.bind(this);\n  }\n\n  componentDidMount() {\n    this.renderData();\n  }\n\n  componentWillReceiveProps(nextProps) {\n    if (this.props.props.selectedShow !== nextProps.props.selectedShow) {\n      this.renderData();\n    }\n  }\n\n  renderData() {\n    const url = \"https://rickandmortyapi.com/api/character/\";\n    const modifyUrl = this.props.props.selectedShow ? \"\".concat(url, \"?name=\").concat(this.props.props.selectedShow) : url;\n    axios__WEBPACK_IMPORTED_MODULE_2___default.a.get(modifyUrl).then(response => {\n      this.props.sendData(response.data);\n    }).catch(error => {\n      console.error('axios error', error); // eslint-disable-line no-console\n    });\n  }\n\n  render() {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_Layout__WEBPACK_IMPORTED_MODULE_5__[\"default\"], Object.assign({}, this.props, {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 39\n      },\n      __self: this\n    }));\n  }\n\n}\n\nconst mapDispatchToProps = (dispatch, ownProps) => {\n  return {\n    sendData(data) {\n      dispatch(Object(_CharacterList_action__WEBPACK_IMPORTED_MODULE_3__[\"loadCharacterList\"])(data));\n    },\n\n    loadList: data => {\n      dispatch(Object(_CharacterList_action__WEBPACK_IMPORTED_MODULE_3__[\"loadCharacterList\"])(data));\n    },\n    removeFiterItem: data => {\n      dispatch(Object(_Filters_action__WEBPACK_IMPORTED_MODULE_6__[\"removeCheckboxFilter\"])(data));\n    }\n  };\n};\n\nconst mapStateToProps = state => {\n  return {\n    character: Object(_CharacterList_selector__WEBPACK_IMPORTED_MODULE_4__[\"getCharacter\"])(state),\n    filters: Object(_CharacterList_selector__WEBPACK_IMPORTED_MODULE_4__[\"getFilterLIst\"])(state)\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(mapStateToProps, mapDispatchToProps)(Search));\n\n//# sourceURL=webpack:///./src/containers/Search/Search.jsx?");

/***/ }),

/***/ "./src/containers/Search/constants.js":
/*!********************************************!*\
  !*** ./src/containers/Search/constants.js ***!
  \********************************************/
/*! exports provided: LOAD_SEARCH_ITEMS, SET_SEARCH_TERM */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LOAD_SEARCH_ITEMS\", function() { return LOAD_SEARCH_ITEMS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SET_SEARCH_TERM\", function() { return SET_SEARCH_TERM; });\nconst LOAD_SEARCH_ITEMS = \"LOAD_SEARCH_ITEMS\";\nconst SET_SEARCH_TERM = 'SET_SEARCH_TERM';\n\n//# sourceURL=webpack:///./src/containers/Search/constants.js?");

/***/ }),

/***/ "./src/containers/Search/reducer.js":
/*!******************************************!*\
  !*** ./src/containers/Search/reducer.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./src/containers/Search/constants.js\");\n\nconst initialState = {\n  searchTerm: '',\n  searchResult: []\n};\n\nconst search = (state = initialState, action) => {\n  switch (action.type) {\n    case _constants__WEBPACK_IMPORTED_MODULE_0__[\"SET_SEARCH_TERM\"]:\n      return Object.assign({}, state, action.payload);\n\n    case _constants__WEBPACK_IMPORTED_MODULE_0__[\"LOAD_SEARCH_ITEMS\"]:\n      return Object.assign({}, state, action.payload);\n\n    default:\n      return state;\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (search);\n\n//# sourceURL=webpack:///./src/containers/Search/reducer.js?");

/***/ }),

/***/ "./src/containers/common/Layout.jsx":
/*!******************************************!*\
  !*** ./src/containers/common/Layout.jsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_CharactersListComp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/CharactersListComp */ \"./src/components/CharactersListComp.jsx\");\n/* harmony import */ var _Filters_Filters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Filters/Filters */ \"./src/containers/Filters/Filters.jsx\");\n/* harmony import */ var _components_SelectedFilter_SelectedFilter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/SelectedFilter/SelectedFilter */ \"./src/components/SelectedFilter/SelectedFilter.jsx\");\nvar _jsxFileName = \"/Users/shakumar16/Desktop/Training/reactRedux/src/containers/common/Layout.jsx\";\n\n\n\n // import icons from 'glyphicons'\n\nconst Layout = props => {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"plp\",\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 10\n    },\n    __self: undefined\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"left\",\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 11\n    },\n    __self: undefined\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Filters_Filters__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 11\n    },\n    __self: undefined\n  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"right\",\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 12\n    },\n    __self: undefined\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_SelectedFilter_SelectedFilter__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    filterData: props.filters ? props.filters.filterList : [],\n    removeFiterItem: props.removeFiterItem,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 13\n    },\n    __self: undefined\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_CharactersListComp__WEBPACK_IMPORTED_MODULE_1__[\"default\"], Object.assign({}, props, {\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 14\n    },\n    __self: undefined\n  }))));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Layout);\n\n//# sourceURL=webpack:///./src/containers/common/Layout.jsx?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n\n\nlet app = __webpack_require__(/*! ./server */ \"./src/server/index.js\").default;\n\nif (true) {\n  module.hot.accept(/*! ./server */ \"./src/server/index.js\", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (() => {\n    console.log('Server reloading...');\n\n    try {\n      app = __webpack_require__(/*! ./server */ \"./src/server/index.js\").default;\n    } catch (error) {// Do nothing\n    }\n  })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this));\n}\n\nexpress__WEBPACK_IMPORTED_MODULE_0___default()().use((req, res) => app.handle(req, res)).listen(\"3000\" || false, () => {\n  console.log(\"React SSR App is running: http://localhost:\".concat(\"3000\" || false));\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/reducer.js":
/*!************************!*\
  !*** ./src/reducer.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _containers_CharacterList_reducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./containers/CharacterList/reducer */ \"./src/containers/CharacterList/reducer.js\");\n/* harmony import */ var _containers_Search_reducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./containers/Search/reducer */ \"./src/containers/Search/reducer.js\");\n/* harmony import */ var _containers_Filters_reducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./containers/Filters/reducer */ \"./src/containers/Filters/reducer.js\");\n\n\n\n\nconst combinedReducer = Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"combineReducers\"])({\n  characterList: _containers_CharacterList_reducer__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  search: _containers_Search_reducer__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  filters: _containers_Filters_reducer__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (combinedReducer);\n\n//# sourceURL=webpack:///./src/reducer.js?");

/***/ }),

/***/ "./src/server/index.js":
/*!*****************************!*\
  !*** ./src/server/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _middleware_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./middleware/html */ \"./src/server/middleware/html.js\");\n/* harmony import */ var _middleware_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./middleware/store */ \"./src/server/middleware/store.js\");\n/* harmony import */ var _middleware_render__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./middleware/render */ \"./src/server/middleware/render.js\");\n\n\n\n\n\nconst publicPath = path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, '/public');\nconst app = express__WEBPACK_IMPORTED_MODULE_1___default()();\napp.use(express__WEBPACK_IMPORTED_MODULE_1___default.a.static(publicPath));\napp.use(Object(_middleware_html__WEBPACK_IMPORTED_MODULE_2__[\"default\"])());\napp.use(Object(_middleware_store__WEBPACK_IMPORTED_MODULE_3__[\"default\"])()); // must come before render middleware\n\napp.use(Object(_middleware_render__WEBPACK_IMPORTED_MODULE_4__[\"default\"])());\n/* harmony default export */ __webpack_exports__[\"default\"] = (app);\n\n//# sourceURL=webpack:///./src/server/index.js?");

/***/ }),

/***/ "./src/server/middleware/html.js":
/*!***************************************!*\
  !*** ./src/server/middleware/html.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst htmlMiddleware = () => (req, res, next) => {\n  const publicPath = path__WEBPACK_IMPORTED_MODULE_1___default.a.join(__dirname, '/public');\n  fs__WEBPACK_IMPORTED_MODULE_0___default.a.readFile(\"\".concat(publicPath, \"/app.html\"), 'utf8', (err, html) => {\n    if (!err) {\n      req.html = html;\n      next();\n    } else {\n      res.status(500).send('Error parsing app.html');\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (htmlMiddleware);\n\n//# sourceURL=webpack:///./src/server/middleware/html.js?");

/***/ }),

/***/ "./src/server/middleware/render.js":
/*!*****************************************!*\
  !*** ./src/server/middleware/render.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var escape_string_regexp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! escape-string-regexp */ \"escape-string-regexp\");\n/* harmony import */ var escape_string_regexp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(escape_string_regexp__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var serialize_javascript__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! serialize-javascript */ \"serialize-javascript\");\n/* harmony import */ var serialize_javascript__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(serialize_javascript__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../App */ \"./src/App.js\");\nvar _jsxFileName = \"/Users/shakumar16/Desktop/Training/reactRedux/src/server/middleware/render.js\";\n\n\n\n\n\n\n\n\n\nconst renderMiddleware = () => (req, res) => {\n  let html = req.html;\n  const store = req.store;\n  const sheet = new styled_components__WEBPACK_IMPORTED_MODULE_1__[\"ServerStyleSheet\"]();\n  const routerContext = {};\n  const htmlContent = react_dom_server__WEBPACK_IMPORTED_MODULE_3___default.a.renderToString(react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_4__[\"Provider\"], {\n    store: store,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 16\n    },\n    __self: undefined\n  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__[\"StaticRouter\"], {\n    location: req.url,\n    context: routerContext,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 17\n    },\n    __self: undefined\n  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_App__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 21\n    },\n    __self: undefined\n  }))));\n  const htmlReplacements = {\n    PRELOADED_STATE: serialize_javascript__WEBPACK_IMPORTED_MODULE_5___default()(store.getState(), {\n      isJSON: true\n    }),\n    STYLE_TAGS: sheet.getStyleTags(),\n    HTML_CONTENT: htmlContent\n  };\n  Object.keys(htmlReplacements).forEach(key => {\n    const value = htmlReplacements[key];\n    console.log(value);\n    html = html.replace(new RegExp('__' + escape_string_regexp__WEBPACK_IMPORTED_MODULE_0___default()(key) + '__', 'g'), value);\n  });\n\n  if (routerContext.url) {\n    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');\n    res.header('Pragma', 'no-cache');\n    res.header('Expires', 0);\n    res.redirect(302, routerContext.url);\n  } else {\n    res.send(html);\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (renderMiddleware);\n\n//# sourceURL=webpack:///./src/server/middleware/render.js?");

/***/ }),

/***/ "./src/server/middleware/store.js":
/*!****************************************!*\
  !*** ./src/server/middleware/store.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../reducer */ \"./src/reducer.js\");\n\n\n\nconst configureStore = () => {\n  const store = Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"createStore\"])(_reducer__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n  return store;\n};\n\nconst storeMiddleware = () => (req, res, next) => {\n  const store = configureStore();\n  req.store = store;\n  next();\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (storeMiddleware);\n\n//# sourceURL=webpack:///./src/server/middleware/store.js?");

/***/ }),

/***/ 0:
/*!*************************************************!*\
  !*** multi webpack/hot/poll?100 ./src/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! webpack/hot/poll?100 */\"./node_modules/webpack/hot/poll.js?100\");\nmodule.exports = __webpack_require__(/*! /Users/shakumar16/Desktop/Training/reactRedux/src/index.js */\"./src/index.js\");\n\n\n//# sourceURL=webpack:///multi_webpack/hot/poll?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");\n\n//# sourceURL=webpack:///external_%22axios%22?");

/***/ }),

/***/ "escape-string-regexp":
/*!***************************************!*\
  !*** external "escape-string-regexp" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"escape-string-regexp\");\n\n//# sourceURL=webpack:///external_%22escape-string-regexp%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom/server\");\n\n//# sourceURL=webpack:///external_%22react-dom/server%22?");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-redux\");\n\n//# sourceURL=webpack:///external_%22react-redux%22?");

/***/ }),

/***/ "react-router":
/*!*******************************!*\
  !*** external "react-router" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router\");\n\n//# sourceURL=webpack:///external_%22react-router%22?");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-dom\");\n\n//# sourceURL=webpack:///external_%22react-router-dom%22?");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux\");\n\n//# sourceURL=webpack:///external_%22redux%22?");

/***/ }),

/***/ "serialize-javascript":
/*!***************************************!*\
  !*** external "serialize-javascript" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"serialize-javascript\");\n\n//# sourceURL=webpack:///external_%22serialize-javascript%22?");

/***/ }),

/***/ "styled-components":
/*!************************************!*\
  !*** external "styled-components" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"styled-components\");\n\n//# sourceURL=webpack:///external_%22styled-components%22?");

/***/ })

/******/ });