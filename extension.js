const vscode = require('vscode');

const CommandId = {
	REMOVE_LEADING_WHITESPACE: 'wen.remove_leading_whitespace',
}

function removeLeadingWhitespace(editor) {
	const remove = (text) => {
		if (text.startsWith(" ")) {
			return text.trimStart()
		} else {
			//if no whitespace, add 1 whitespace 
			return " " + text
		}
	}
	const { text, range } = editor.document.lineAt(editor.selection.active.line)
	editor.edit(edit => edit.replace(range, remove(text)));

}

function activate(context) {
	let disposable = vscode.commands.registerTextEditorCommand(
		CommandId.REMOVE_LEADING_WHITESPACE,
		(editor) => removeLeadingWhitespace(editor));

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
