import 'package:bloc/bloc.dart';
import 'package:fc_frontend/infrastructure/auth/auth_repository.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:injectable/injectable.dart';

import '../../infrastructure/auth/auth_dto.dart';

part 'auth_event.dart';
part 'auth_state.dart';
part 'auth_bloc.freezed.dart';

@injectable
class AuthBloc extends Bloc<AuthEvent, AuthState> {
  final IAuthRepository _authRepository;

  AuthBloc(this._authRepository) : super(const _Initial()) {
    on<AuthEvent>((event, emit) async {
      await event.when(
        check: () {
          /// TODO: Check for stored token
          ///  If a token then:
          ///  - Check if expires is past now or close to expiring
          ///  Else just show sign-in
        },
        signIn: (email, password) async {
          final tokenOrFailure = await _authRepository.signIn(
            email: email,
            password: password,
          );

          tokenOrFailure.fold(
            /// TODO: Handle showing failure,
            (l) {},

            /// TODO: Handle signing in
            (TokenResponseDto r) {},
          );
        },
        signOut: () {
          /// TODO: Clear stored token and add AuthEvent.check()
        },
      );
    });
  }
}
