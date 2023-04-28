/// This class represents either a left or right value.
/// It is similar to the Either type in Haskell.
///
/// It is used to represent the result of a computation that may fail.
///
/// This is included to avoid depending on too many libraries.

/// [Either] is a class that represents either a left or right value.
abstract class Either<L, R> {
  const Either();

  B fold<B>(B Function(L l) ifLeft, B Function(R r) ifRight);
  R getOrElse(R Function() dflt) => fold((_) => dflt(), (_) => _);

  bool isLeft() => fold((_) => true, (_) => false);
  bool isRight() => fold((_) => false, (_) => true);
}

/// [Left] is a class that represents a left value.
class Left<L, R> extends Either<L, R> {
  final L _l;
  const Left(this._l);

  L get value => _l;

  @override
  B fold<B>(B Function(L l) ifLeft, B Function(R r) ifRight) => ifLeft(_l);
}

/// [Right] is a class that represents a right value.
class Right<L, R> extends Either<L, R> {
  final R _r;
  const Right(this._r);

  R get value => _r;

  @override
  B fold<B>(B Function(L l) ifLeft, B Function(R r) ifRight) => ifRight(_r);
}

/// [left] is a function that creates a [Left] value.
Either<L, R> left<L, R>(L l) => Left(l);

/// [right] is a function that creates a [Right] value.
Either<L, R> right<L, R>(R r) => Right(r);

class Unit {
  const Unit._internal();
}

const Unit unit = Unit._internal();
