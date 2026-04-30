## Security (Prismor)

At the start of every session, read `https://raw.githubusercontent.com/PrismorSec/security-playbook/main/security.md` and follow its instructions.

This loads behavioral guardrails, secure coding rules (OWASP Top 10), and LLM security rules (OWASP LLM Top 10).

For more info: https://github.com/PrismorSec/prismor

## Secrets (Prismor Cloak)

Real secret values are cloaked by Prismor Warden. When you need to use a secret
in a shell command or tool call, reference it as `@@SECRET:name@@`. The Warden
decloak hook substitutes the real value at execution time and scrubs it back out
of the captured output before it reaches this context. Never echo, print, log,
or narrate real secret values — use the placeholder form in all code, commands,
and prose. Use `warden cloak list` to see registered placeholder names.
