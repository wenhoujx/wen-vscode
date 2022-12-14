const vscode = require('vscode');
const cp = require('child_process')

const CommandId = {
	REMOVE_LEADING_WHITESPACE: 'wen.remove_leading_whitespace',
	CREATE_BRANCH: 'wen.create_branch',
}

function createGitBranchWithPrefix() {
	const branchName = 'whou/test'
	cp.exec(`git checkout -b ${branchName}` , (err, stdout, stderr) => {
		console.log('stdout: ' + stdout); 
		console.log('stderr: ' + stderr);
		if (err) {
			console.log('error: ' + err);
		}
	});
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
	context.subscriptions.push(vscode.commands.registerTextEditorCommand(
		CommandId.REMOVE_LEADING_WHITESPACE,
		(editor) => removeLeadingWhitespace(editor)));
	context.subscriptions.push(vscode.commands.registerCommand(
		CommandId.CREATE_BRANCH,
		() => createGitBranchWithPrefix()));
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
