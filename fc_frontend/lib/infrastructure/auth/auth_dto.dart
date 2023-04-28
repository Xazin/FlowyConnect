class TokenResponseDto {
  final String token;
  final DateTime expires;
  final DateTime activeSince;

  TokenResponseDto({
    required this.token,
    required this.expires,
    required this.activeSince,
  });

  static TokenResponseDto fromJson(Map<String, dynamic> json) =>
      TokenResponseDto(
        token: json['accessToken'],
        expires: DateTime.fromMillisecondsSinceEpoch(json['expires'] * 1000),
        activeSince:
            DateTime.fromMillisecondsSinceEpoch(json['activeSince'] * 1000),
      );
}
