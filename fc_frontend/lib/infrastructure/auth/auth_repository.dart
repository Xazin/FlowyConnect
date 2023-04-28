import 'dart:convert';
import 'dart:io';

import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';

import 'package:fc_frontend/core/either.dart';
import 'package:fc_frontend/infrastructure/auth/auth_dto.dart';
import 'package:fc_frontend/infrastructure/auth/auth_failure.dart';
import 'package:injectable/injectable.dart';

abstract class IAuthRepository {
  Future<Either<AuthFailure, TokenResponseDto>> signIn({
    required String email,
    required String password,
  });

  Future<Either<AuthFailure, Unit>> signOut();
}

@LazySingleton(as: IAuthRepository)
class AuthRepository implements IAuthRepository {
  final http.Client _client;

  late final String _baseUrl;

  AuthRepository(this._client) {
    _baseUrl = dotenv.get('BASE_URL');
  }

  static const signInEndpoint = '/v1/auth/login';

  @override
  Future<Either<AuthFailure, TokenResponseDto>> signIn({
    required String email,
    required String password,
  }) async {
    try {
      final uri = Uri.parse('$_baseUrl$signInEndpoint');

      final response = await _client.post(
        uri,
        headers: {
          'Content-Type': ContentType.json.toString(),
        },
        body: jsonEncode({
          "email": email,
          "password": password,
        }),
      );

      if (response.statusCode != 201) {
        return left(AuthFailure());
      }

      return right(TokenResponseDto.fromJson(jsonDecode(response.body)));
    } catch (_) {
      /// TODO: Better error handling ?
      return left(AuthFailure());
    }
  }

  @override
  Future<Either<AuthFailure, Unit>> signOut() {
    // TODO: implement signOut
    throw UnimplementedError();
  }
}
