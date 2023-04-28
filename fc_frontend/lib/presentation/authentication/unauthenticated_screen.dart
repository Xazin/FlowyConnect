import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../application/auth/auth_bloc.dart';

class UnauthenticatedScreen extends StatefulWidget {
  const UnauthenticatedScreen({super.key});

  @override
  State<UnauthenticatedScreen> createState() => _UnauthenticatedScreenState();
}

class _UnauthenticatedScreenState extends State<UnauthenticatedScreen> {
  late final TextEditingController _emailController;
  late final TextEditingController _passwordController;

  @override
  void initState() {
    super.initState();
    _emailController = TextEditingController();
    _passwordController = TextEditingController();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 40),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              TextField(
                controller: _emailController,
                decoration: const InputDecoration(
                  label: Text('Email'),
                ),
              ),
              const SizedBox(height: 20),
              TextField(
                controller: _passwordController,
                obscureText: true,
                keyboardType: TextInputType.emailAddress,
                decoration: const InputDecoration(
                  label: Text('Password'),
                ),
              ),
              const SizedBox(height: 20),
              TextButton(
                onPressed: () {
                  /// TODO: Client-side Sanitazion and Validation
                  BlocProvider.of<AuthBloc>(context).add(
                    AuthEvent.signIn(
                      email: _emailController.text,
                      password: _passwordController.text,
                    ),
                  );
                },
                style: ButtonStyle(
                  backgroundColor: MaterialStateProperty.resolveWith((states) {
                    if (states.contains(MaterialState.pressed)) {
                      /// TODO: Do actual button styling
                      return Color.lerp(
                        Colors.blueAccent,
                        Colors.blue[600],
                        0.1,
                      );
                    }

                    return Colors.blue;
                  }),
                  foregroundColor: MaterialStateProperty.resolveWith((states) {
                    return Colors.white;
                  }),
                  splashFactory: InkSplash.splashFactory,
                ),
                child: const Text('Sign in'),
              ),
              TextButton(
                onPressed: () {
                  /// TODO: Sign up
                },
                child: const Text('Register'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
