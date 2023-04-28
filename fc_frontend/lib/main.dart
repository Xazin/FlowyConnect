import 'package:fc_frontend/application/auth/auth_bloc.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

import 'infrastructure/injectable/injectable.dart';
import 'presentation/authentication/unauthenticated_screen.dart';

Future<void> main() async {
  await dotenv.load();
  configureDependencies();

  runApp(const AppWidget());
}

class AppWidget extends StatelessWidget {
  const AppWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData.light(),
      home: Scaffold(
          body: BlocProvider(
        create: (context) => getIt<AuthBloc>()..add(const AuthEvent.check()),
        child: BlocListener<AuthBloc, AuthState>(
          listener: (context, state) {},
          child: const UnauthenticatedScreen(),
        ),
      )),
    );
  }
}
