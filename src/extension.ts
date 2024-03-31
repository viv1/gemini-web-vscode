// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import path from "path";
import fs from "fs";

// This method is called when the extension is activated
// The extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "geminiwebchat" is now active!');

	// The command has been defined in the package.json file
	// The commandId parameter must match the command field in package.json
	let geminiwebchat = vscode.commands.registerCommand('webchatforgemini.open', () => {
		const panel = vscode.window.createWebviewPanel(
			"webviewInteract",
			"Web Chat for Gemini",
			vscode.ViewColumn.One,
			{
			  enableScripts: true,
			  retainContextWhenHidden: true,
			  localResourceRoots: [vscode.Uri.file(context.extensionPath)],
			}
		  );

		// Load HTML content from file
		const htmlPath = path.join(context.extensionPath, "src/index.html");
		const htmlContent = vscode.Uri.file(htmlPath).with({
		  scheme: "vscode-resource",
		});
		panel.webview.html = fs.readFileSync(htmlContent.fsPath, "utf8");
	});

	context.subscriptions.push(geminiwebchat);
}

// This method is called when the extension is deactivated. It's a No-Op at this point
export function deactivate() {}
