# Appfe

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

https://stackoverflow.com/questions/4037939/powershell-says-execution-of-scripts-is-disabled-on-this-system
cannot be loaded because running scripts is disabled on this system:
Set-ExecutionPolicy RemoteSigned



TS2322: Type 'null' is not assignable to type 'string'.

Since version 3.9.5, TypeScript enforces `strictNullChecks` on `numbers` and `strings` just to name a few. For example, the following code will throw an error during compilation:

```typescript
let x: number = null;
```

To avoid this error you have two options:

- Set `strictNullChecks=false` in `tsconfig.json`.

- Declare your variable type as

	 

	```
	any
	```

	:

	```typescript
	let x: any = null;
	```

## **Angular CLI Cheat Sheet**

```powershell
ng new <project name>  # To create a new project

ng serve  # To host the project on 4200 port

ng serve --port <port no> --host <host name> # To host application specific host/port
```

We can use a short alias as well:

```powershell
ng s --p <port no> --h <hostname>
```

### **Some other helpful commands**

```nginx
ng lint # To lint and look for JavaScript errors

ng lint --format stylish # Linting and formatting the output

ng lint --fix # Lint and attempt to fix all the problems

ng build # to build a project in the dist folder

ng build ---target <target name> # Target for which we want to build

ng build --prod # To build in production mode

ng test # To run spec files

ng e2e # To run e2e test cases

ng doc # To look for angular documentation

ng help # To get help on angular cli commands
```

### **To change the .angular-cli.json config**

```nginx
ng set # to change properties

# For e.g. ng set default.styleExt scss
# ng set default.styleExt scss -g -- To set in global angular-cli file
```

### **Components**

```nginx
ng generate component <component name> # To generate new component
ng g c <component name> # Short notation to generate component

ng g c <component name> --flat # Want to generate folder name as well?

ng g c <component name> --inline-template # Want to generate HTML file?
ng g c <component name> -it # Short notation

ng g c <component name> --inline-style # Want to generate css file?
ng g c <component name> -is # Short notation

ng g c <component name> --spec # Want to generate spec file?

ng g c <component name> --view-encapsulation # View encapsulation stratergy
ng g c <component name> -ve # Short notation

ng g c <component name> --change-detection # Change detection strategy
ng g c <component name> -cd # Short notation

ng g c <component name> --dry-run # To only report files and don't write them
ng g c <component name> -d # Short notation


ng g c <component name> -m <module name> -d 
# Name of module where we need to add component as dependency
```

### **Directives and services**

```nginx
ng generate directive <directive-name> # To generate directive
ng g d <directive-name> # short notation

ng g d <directive-name> -d # To only report files and don't write them

ng generate service <service-name> # To generate service
ng g s <service-name> # short notation

ng g s <service-name> -d # To only report files and don't write them

ng g s <service-name> -m <module name> 
# Name of module where we need to add service as dependency
```

### **Classes, Interface, pipe, and enums**

```nginx
ng generate class <class name> # To generate class
ng g cl <class name> # short notation

ng generate interface <interface name> # To generate interface
ng g i <interface name> # short notation

ng generate pipe <pipe name> # To generate pipe
ng g p <pipe name> # short notation

ng generate enum <enum name> # To generate enum
ng g e <enum name> # short notation
```

### **Module and routing**

```nginx
ng generate module <module name> # To generate module
ng g m <module name> # To short notation

ng g m <module name> --spec true -d # To generate spec file for the module

ng g m <module name> --routing # To generate module with routing file

ng g guard <guard name> # To generate guard to route
```

### **Source Map Explorer**

Source Map Explorer is a tool to view the treemap visualization to know where the code(from which file or module) is coming from. We can better understand it by using it. To download the tool run the command as shown below:

```nginx
npm install -g source-map-explorer
```

Now we have source map explorer installed globally. To see the visualization firstly we need to build our angular app and then see the visualization. Please refer the command shown below:

```nginx
ng build # To build the solution
source-map-explorer dist/main.bundle.js # Open a treemap visualization
```

In this post, I have tried to cover all the possible ng commands. Please let me know in comment section if I have missed