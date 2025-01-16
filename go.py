s=input()
num = list(range(1,27))
i=0
ans=0
for x in s:
    if ord(x)-96 == num[i]:
        ans+=1
    i+=1

print(ans)