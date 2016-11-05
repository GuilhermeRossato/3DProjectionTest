3D Projection Test
=======================

Drawing 3D projections are one of my hobbies, so I created this small experiment that draws a simple box (that invariably moves around)

[Click here to see the experiment](https://cdn.rawgit.com/GuilhermeRossato/3DProjectionTest/master/index.html)

Why does it moves
-----------------------
I just HAD to find a use for bezier curves and bezier functions. 

If you see one of my experiments and it does not contain the application of bezier function:
 * It's comissioned and the comissioner asked not to use bezier functions
 * The use of them is prohibited by law
 * 
 * Its impossible to put bezier into it.

What are Bezier Functions
-----------------------
    b(i,j,t) = i + (j - i) * t;  // Bezier Function
    ib(i,j,t) = (t-i)/(j-i);     // Inverse Bezier Function

Useful pair of functions that can be used EVERYWHERE.

 * Smooth Motion of Objects
 * Predict future positions
 * Stable and intuitive interpolation
 * STABLEST recursive interpolation algorithm (Casteljau's)
 * They are simple af, one describe a linear path, the other describes a de-linearization of a linear path.

Consider I and J as constants, B is a function that depend on a t-value in the interval [0..1] (t is usually time, but could be anything), the inverse bezier function is a value that generates this t-value, given a position inbetween two numbers.

All hail Bezier. (it wasn't necessarily him who developed all uses for it, nor the only one who created the functions, be we just had to name someone to take the credit, that lazy Casteljau guy gets too much love already)
  
Dependencies
-----------------------
This project is too simple to have any dependency, all code was created manually.

No libraries were ~harmed~ used to develop this tiny application

I release this under the [MIT License](https://github.com/reinteractive-open/default_readme/blob/master/MIT-LICENSE.txt).