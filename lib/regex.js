const { regex } = require('regex');

/**
 * ReDoS-protected regex patterns using atomic groups from the `regex` npm package.
 *
 * Atomic groups (?>...) prevent catastrophic backtracking. Used selectively
 * on patterns with [\s\S]+? that are prone to exponential backtracking.
 *
 * Note: disable x flag to preserve literal spaces, and patterns with .*?$
 * cannot use atomic groups (they need backtracking to find line end).
 */

const r = (flags = '') => regex({ flags, disable: { x: true, n: true } });

class RegexList {
  constructor() {
    this.quoteHeadersRegex = [
      // On DATE, NAME <EMAIL> wrote:
      r('m')`^-*\s*(On\s.+?\s.+?\n?wrote:?)\s?-*$`,

      // Le DATE, NAME <EMAIL> a écrit :
      r('m')`^-*\s*(Le\s.+?\s.+?\n?écrit\s?:?)\s?-*$`,

      // El DATE, NAME <EMAIL> escribió:
      r('m')`^-*\s*(El\s.+?\s.+?\n?escribió:?)\s?-*$`,

      // Il DATE, NAME <EMAIL> ha scritto:
      r('m')`^-*\s*(Il\s.+?\s.+?\n?scritto:?)\s?-*$`,

      // Em DATE, NAME <EMAIL> escreveu:
      r('m')`^-*\s*(Em\s.+?\s.+?\n?escreveu:?)\s?-*$`,

      // Am DATE schrieb NAME <EMAIL>:
      r('m')`^\s*(Am\s.+?\s)\n?\n?schrieb.+?\s?(?:\[|<).+?(?:\]|>):$`,

      // Op DATE, schreef NAME <EMAIL>: - ATOMIC ([\s\S]+? prone to backtracking)
      r('m')`^\s*(?>Op\s[\s\S]+?\n?schreef[\s\S]+?:)$`,

      // W dniu DATE, NAME <EMAIL> pisze|napisał: - ATOMIC
      r('m')`^\s*(?>(W\sdniu|Dnia)\s[\s\S]+?(pisze|napisał(\(a\))?):)$`,

      // Den DATE skrev NAME <EMAIL>:
      r('m')`^\s*(Den\s.+?\s\n?skrev\s.+?:)$`,

      // pe DATE NAME <EMAIL> kirjoitti:
      r('m')`^\s*(pe\s.+?\s.+?\n?kirjoitti:)$`,

      // Am DATE um TIME schrieb NAME:
      r('m')`^\s*(Am\s.+?\sum\s.+?\s\n?schrieb\s.+?:)$`,

      // 在 DATE, TIME, NAME 写道： - ATOMIC
      r('m')`^(?>在[\s\S]+?写道：)$`,

      // DATE TIME NAME 작성:
      r('m')`^(20[0-9]{2}\..+?\s작성:)$`,

      // DATE TIME、NAME のメッセージ:
      r('m')`^(20[0-9]{2}\/.+?のメッセージ:)$`,

      // NAME <EMAIL> schrieb:
      r('m')`^(.+?\s<.+?>\sschrieb:)$`,

      // NAME on DATE wrote:
      r('m')`^(.+?\son.*?at.*?wrote:)$`,

      // From: NAME <EMAIL>
      r('m')`^\s*(From\s?:.+?\s?\n?\s*(?:\[|<).+?(?:\]|>))`,

      // Von: NAME <EMAIL>
      r('m')`^\s*(Von\s?:.+?\s?\n?\s*(?:\[|<).+?(?:\]|>))`,

      // De: NAME <EMAIL>
      r('m')`^\s*(De\s?:.+?\s?\n?\s*(?:\[|<).+?(?:\]|>))`,

      // Van: NAME <EMAIL>
      r('m')`^\s*(Van\s?:.+?\s?\n?\s*(?:\[|<).+?(?:\]|>))`,

      // Da: NAME <EMAIL>
      r('m')`^\s*(Da\s?:.+?\s?\n?\s*(?:\[|<).+?(?:\]|>))`,

      // 20YY-MM-DD HH:II GMT+01:00 NAME <EMAIL>:
      r('m')`^(20[0-9]{2})-([0-9]{2}).([0-9]{2}).([0-9]{2}):([0-9]{2})\n?(.*?)>:$`,

      // DATE skrev NAME <EMAIL>: - ATOMIC
      r('m')`^\s*(?>[a-z]{3,4}\.\s[\s\S]+?\sskrev\s[\s\S]+?:)$`,

      // DD.MM.20YY HH:II NAME <EMAIL>
      r('m')`^([0-9]{2}).([0-9]{2}).(20[0-9]{2})(.*?)(([0-9]{2}).([0-9]{2}))(.*?)"( *)<(.*?)>( *):$`,

      // HH:II, DATE, NAME <EMAIL>:
      r()`^[0-9]{2}:[0-9]{2}(.*?)[0-9]{4}(.*?)"( *)<(.*?)>( *):$`,

      // from ... DATE ... from ... <EMAIL>:
      r()`^(?=.*from)(.*?)[0-9]{4}(.*?)from(.*?)<(.*?)>:$`,

      // Original Message variants
      r('i')`^-{1,10} ?(O|o)riginal (M|m)essage ?-{1,10}$`,
      r('i')`^-{1,10} ?(O|o)prindelig (B|b)esked ?-{1,10}$`,
      r('i')`^-{1,10} ?(M|m)essage d'origine ?-{1,10}$`,
    ];

    this.signatureRegex = [
      // Separators
      r()`^\s*-{2,4}$`,
      r()`^\s*_{2,4}$`,
      r()`^-- $`,
      r()`^-- \s*.+?$`,
      r()`^\+{2,4}$`,
      r()`^={2,4}$`,
      r()`^________________________________$`,

      // EN
      r()`^Sent from (?:\s*.+?)$`,
      r('m')`^Get Outlook for (?:\s*.+?).*?`,
      r('mi')`^Cheers,?!?$`,
      r('mi')`^Best wishes,?!?$`,
      r('mi')`^\w{0,20}\s?(\sand\s)?Regards,?!?！?$`,

      // DE
      r()`^Von (?:\s*.+?) gesendet$`,

      // DA
      r()`^Sendt fra (?:\s*.+?)$`,

      // FR
      r()`^Envoyé depuis (?:\s*.+?)$`,
      r()`^Envoyé de mon (?:\s*.+?)$`,
      r()`^Envoyé à partir de (?:\s*.+?)$`,
      r('m')`^Télécharger Outlook pour (?:\s*.+?).*?`,
      r('mi')`^Bien . vous,?!?$`,
      r('mi')`^\w{0,20}\s?cordialement,?!?$`,
      r('mi')`^Bonne (journ.e|soir.e)!?$`,

      // ES
      r()`^Enviado desde (?:\s*.+?)$`,

      // NL
      r()`^Verzonden vanaf (?:\s*.+?)$`,
    ];
  }
}

module.exports = new RegexList();
