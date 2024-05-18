<script setup>
import {
  provideVSCodeDesignSystem,
  vsCodeButton,
  vsCodePanelTab,
  vsCodePanels,
  vsCodePanelView,
  vsCodeDivider,
  vsCodeDataGridRow,
  vsCodeDataGridCell,
  vsCodeTextField,
  vsCodeCheckbox,
  vsCodeDataGrid,
  vsCodeTextArea

} from "@vscode/webview-ui-toolkit";
provideVSCodeDesignSystem().register(
  vsCodeButton(),
  vsCodePanelTab(),
  vsCodePanels(),
  vsCodePanelView(),
  vsCodeDivider(),
  vsCodeDataGridRow(),
  vsCodeDataGridCell(),
  vsCodeDataGrid(),
  vsCodeTextField(),
  vsCodeCheckbox(),
  vsCodeTextArea()
);
import { ref, onMounted } from "vue";
import Iblize from "iblize";
const editor = ref(null);
const host = ref(null);
const username = ref(null);
const password = ref(null);
const service = ref(null);
const app = ref(null);
const output = ref(null);

var iblize = null;
onMounted(() => {
  iblize = new Iblize(editor.value, {
    language: "json",
  });
  if (window.input) {
    host.value.value = thisorempty(window.input.host);
    username.value.value = thisorempty(window.input.username);
    password.value.value = thisorempty(window.input.password);
    service.value.value = thisorempty(window.input.service);
    app.value.value = thisorempty(window.input.app);
    setCodeValue(window.input.input)
  }

  window.addEventListener('message', event => {

    const message = event.data; // The JSON data our extension sent
    output.value.value = message;
    
  });

})

const format = () => {
  try {
    var value = JSON.parse(iblize.getValue());
    iblize.setValue(JSON.stringify(value, null, 4));
  } catch (e) { }
}
const setCodeValue = (value) => {
  try {
    iblize.setValue(JSON.stringify(value, null, 4));
  } catch (e) { }
}
const getCodeValue = () => {
  try {
    return JSON.parse(iblize.getValue());
  } catch (e) { }

  return {};
}
const thisorempty = (t) => {
  return t ? t : "";
}
const saveTestCase = () => {
  var input = {
    input: getCodeValue(),
    host: thisorempty(host.value.value),
    username: thisorempty(username.value.value),
    password: thisorempty(password.value.value),
    service: thisorempty(service.value.value),
    app: thisorempty(app.value.value),
  }
  var text = JSON.stringify(input, null, 4);
  vscode.postMessage({
    command: 'saveTestCase',
    text: text
  });
}

const runTestCase = () => {
  var input = {
    input: getCodeValue(),
    host: thisorempty(host.value.value),
    username: thisorempty(username.value.value),
    password: thisorempty(password.value.value),
    service: thisorempty(service.value.value),
    app: thisorempty(app.value.value),
  }
  var text = JSON.stringify(input, null, 4);
  vscode.postMessage({
    command: 'runTestCase',
    text: text
  });
}
</script>

<template>
  <div class="container">
    <vscode-text-field type="text" ref="host">Host</vscode-text-field>
    <vscode-text-field type="text" ref="username">Username</vscode-text-field>
    <vscode-text-field type="password" ref="password">Password</vscode-text-field>
    <vscode-text-field type="text" ref="app">App name</vscode-text-field>
    <vscode-text-field type="text" ref="service">Service Name</vscode-text-field>
    <div class="toolbar">
      <vscode-button appearance="primary" @click="saveTestCase">Save</vscode-button>
      <vscode-button appearance="secondary" @click="runTestCase">Run</vscode-button>
      <vscode-button appearance="secondary" @click="format">Format Input</vscode-button>
    </div>
    <div class="column2">
      <div id="editor" ref="editor"></div>
      <div id="result">
        <vscode-text-area id="output" rows="25" ref="output"> </vscode-text-area>
      </div>
    </div>

  </div>
</template>

<style scoped>
#app {
  user-select: none;
}

.container {
  display: flex;
  gap: 10px;
  flex-direction: column;
}

.toolbar {
  display: flex;
  gap: 10px;
}

#editor {
  width: 50%;
  height: 440px;
}

.column2 {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: flex-start;
}

#result {
  width: 50%;
}

#output {
  width: 100%;
  height: 440px;
}
</style>
