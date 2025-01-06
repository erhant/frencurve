<!-- Submit Your Project
Project Name:
Team Members: (Name and Lens Handle)
Project Description:
Source Code Link:
Preview Link (Optional):
Demo Video/Slide Deck Link (Optional):
Screenshots (Optional):
-->

# Project Name

Frencurve

## Team Members

- erhant

## Project Description

Every account in EVM has an address, derived from a public key, derived from a private key. Public key is simply a coordinate on an "[elliptic-curve](https://www.rareskills.io/post/elliptic-curves-finite-fields)", so basically it is a point $(x, y) \in \mathbb{F}_p^2$ for some large prime $p$ such that it satisfies the following curve equation of [`secp256k1`](https://en.bitcoin.it/wiki/Secp256k1):

$$
y^2 = x^3 + 7
$$

Since these are points, they have some distance between them as well! With that, we define "being close to each other" on the elliptic curve to mean that you two are "curve frens"!

This project implements the required contract & frontend to implement friendship over elliptic-curves, which may pave new friendship dynamics built upon cryptography.

## Source Code Link

Github Repository: <https://github.com/erhant/frencurve>

## Preview Link

Live Preview: <https://frencurve.vercel.app/>

## Screenshots

![img](./img/Home.png)
