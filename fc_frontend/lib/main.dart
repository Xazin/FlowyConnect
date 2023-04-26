import 'package:fc_frontend/service/tab_service.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const AppWidget());
}

class AppWidget extends StatelessWidget {
  const AppWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData.light(),
      home: const Scaffold(body: TabBarService()),
    );
  }
}
