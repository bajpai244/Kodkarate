var cplus_hello = `#include<iostream>
using namespace std;
int main(){ 
 cout<<"Hello World";    
}`;

var c_hello = ` #include<stdio.h>
int main(){
printf("Hello World");
return 0;
}`;

var java_hello = `/*   
Important :
When working with java keepyour
entry point of a your program inside The Main public class only
 */


public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
`;

var python_hello = `print("Hello World")`;

var rust_hello = `fn main() {
    println!("Hello World!");
}
`;

var typescript_hello = `var greet: string = "Hello World"; 
console.log(greet ); `;

var prolog_hello = `:- initialization(main).
main :- write('hello, world\n').`;

var php_hello = `<?php
print("hello, world\n");
?>`;

var assembly_hello = `section     .text
global      _start                              ;must be declared for linker (ld)

_start:                                         ;tell linker entry point

    mov     edx,len                             ;message length
    mov     ecx,msg                             ;message to write
    mov     ebx,1                               ;file descriptor (stdout)
    mov     eax,4                               ;system call number (sys_write)
    int     0x80                                ;call kernel

    mov     eax,1                               ;system call number (sys_exit)
    int     0x80                                ;call kernel

section     .data

msg     db  'Hello, world!',0xa                 ;our dear string
len     equ $ - msg                             ;length of our dear string`;

var lisp_hello = `(write-line "hello, world")`;
var d_hello = `import std.stdio;

void main()
{
    writeln("hello, world");
}
`;
var elixir_hello = `IO.puts "hello, world"`;
var erlang_hello = `main(_) ->
io:fwrite("hello, world\n").
`;
var fortran_helo = `program main
print *, "hello, world"
end`;
var go_hello = `package main

import "fmt"

func main() {
    fmt.Println("hello, world")
}`;
var haskell_hello = `main = putStrLn "hello, world"`;
var nodejs_hello = `console.log('Hello world!')`;
var lua_hello = `print("hello, world")`;
var ocaml_hello = `print_endline "hello, world"`;
var octave_hello = `printf("hello, world\n");`;

//The function to generate helloworld snippets

function get_snippet() {
  var language = document.getElementById('language-select').value;
  switch (language) {
    case 'C++(GCC 9.2.0)':
      return cplus_hello;
      break;
    case 'Java(OpenJDK 13.0.1)':
      return java_hello;
      break;
    case 'Python(3.8.1)':
      return python_hello;
      break;
    case 'Python(2.7.17)':
      return python_hello;
      break;
    case 'Rust(1.40.0)':
      return rust_hello;
      break;
    case 'TypeScript(3.7.4)':
      return typescript_hello;
      break;
    case 'Prolog(GNU Prolog 1.4.5)':
      return prolog_hello;
      break;
    case 'Php(7.4.1)':
      return php_hello;
      break;
    case 'Assembly(Nasm 2.14.02)':
      return assembly_hello;
      break;

    case 'Common lisp(SBCL 2.0.0)':
      return lisp_hello;
      break;
    case 'D(DMD 2.089.1)':
      return d_hello;
      break;
    case 'Elixir(1.9.4)':
      return elixir_hello;
      break;
    case 'Erlang(OTP 22.2)':
      return erlang_hello;
      break;
    case 'Fortran(9.2.0)': //Correct in main html
      return fortran_helo;
      break;
    case 'GO':
      return go_hello;
      break;
    case 'Haskell(GHC 8.8.1)':
      return haskell_hello;
      break;
    case 'Nodejs(12.14.0)':
      return nodejs_hello;
      break;
    case 'Lua(5.3.5)':
      return lua_hello;
      break;
    case 'OCaml(4.09.0)':
      return ocaml_hello;
      break;
    case 'Octave(5.1.0)':
      return octave_hello; //pop
      break;
    case 'C(GCC 9.2.0)':
      return c_hello;
      break;
  }
}
