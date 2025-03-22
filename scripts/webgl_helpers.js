define(function() {
    "use strict";

    let w = {};

    w.compileShader = function(gl, shaderSource, shaderType) {
        let shader = gl.createShader(shaderType);
        gl.shaderSource(shader, shaderSource);
        gl.compileShader(shader);
        let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!success) {
            throw new Error("could not compile shader:" + gl.getShaderInfoLog(shader));
        }
        return shader;
    };

    w.createProgram = function(gl, vertexShader, fragmentShader) {
        let program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        let success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!success) {
            throw new Error("program failed to link:" + gl.getProgramInfoLog(program));
        }
        return program;
    };

    w.shaderFromScript = function(gl, scriptId, opt_shaderType) {
        let shaderText = document.getElementById(scriptId).text;
        return w.compileShader(gl, shaderText, opt_shaderType);
    };

    w.programFromScripts = function(gl, vertex, fragment) {
        return w.createProgram(gl,
                w.shaderFromScript(gl, vertex, gl.VERTEX_SHADER),
                w.shaderFromScript(gl, fragment, gl.FRAGMENT_SHADER));
    };

    return w;
});
