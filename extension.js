const vscode = require('vscode');
const cp = require('child_process')

const CommandId = {
	REMOVE_LEADING_WHITESPACE: 'wen.remove_leading_whitespace',
	GIT_BRANCH: 'wen.git_branch',
}

async function createGitBranchWithPrefix() {
	const branchNameBase = await vscode.window.showInputBox({
		placeHolder: "Branch Name",
		prompt: "Branch Name",
	});
	const now = new Date()
	const branchName = `whou/${now.getMonth() + 1}-${now.getDate()}/${branchNameBase}`
	const command = `git checkout -b ${branchName}`
	const terminal = vscode.window.createTerminal(`Git ${branchNameBase}`);
	terminal.sendText(command);
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
		CommandId.GIT_BRANCH,
		() => createGitBranchWithPrefix()));
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
