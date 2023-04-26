import 'package:flutter/material.dart' hide TabBar;

class TabBarService extends StatefulWidget {
  const TabBarService({super.key});

  @override
  State<TabBarService> createState() => _TabBarServiceState();
}

class _TabBarServiceState extends State<TabBarService> {
  @override
  Widget build(BuildContext context) {
    return TabBar();
  }
}

class TabBar extends StatelessWidget {
  const TabBar({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 35,
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(color: Colors.grey.shade300, width: 1.5),
        ),
      ),
      child: Row(
        children: [
          Container(
            width: 100,
            height: 20,
            child: Tab(),
          ),
        ],
      ),
    );
  }
}

class Tab extends StatelessWidget {
  const Tab({super.key});

  @override
  Widget build(BuildContext context) {
    return Container();
  }
}

class SlopeBorder extends StatelessWidget {
  const SlopeBorder({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 25,
      child: CustomPaint(
        painter: _SlopeBorderPainter(),
        child: Text('Hello'),
      ),
    );
  }
}

class _SlopeBorderPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.blue
      ..style = PaintingStyle.fill;

    final path = Path()
      ..moveTo(0, 0)
      ..lineTo(size.width * 0.4, 0)
      ..lineTo(size.width * 0.6, size.height)
      ..lineTo(0, size.height)
      ..close();

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) {
    return false;
  }
}
