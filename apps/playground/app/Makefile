default: fmt

clean:
	pnpm i \
	&& cd ios \
	&& pod install \
	&& cd ../android \
	&& rm -rf app/.cxx \
	&& ./gradlew clean;

clean_deep:
	make -Bs clean_deep_rm \
	&& pnpm i \
	&& cd ios \
	&& xcodebuild clean -quiet \
	&& pod cache clean --all \
	&& pod deintegrate \
	&& pod install --repo-update \
	&& cd ../android \
	&& ./gradlew clean;

clean_deep_rm:
	rm -rf node_modules ios/build ios/Pods ~/Library/Developer/Xcode/DerivedData/* android/.gradle android/app/.cxx android/build ~/.gradle/caches ~/.gradle/daemon $$TMPDIR/react-native* $$TMPDIR/metro* $$TMPDIR/haste-map*;

extract:
	export NEXT_PUBLIC_MINIFY_CLASS_NAMES=1 \
	&& node -r ./z/register ./z/babel-extract;

tw:
	export NEXT_PUBLIC_MINIFY_CLASS_NAMES=1 \
	&& node -r ./z/register ./z/babel-extract;

fmt:
	pnpm lint \
	&& pnpm tsc \
	&& make -Bs fmt_objc \
	&& make -Bs fmt_swift \
	&& make -Bs fmt_java \
	&& make -Bs fmt_kotlin \
	&& make -Bs fmt_xml;

fmt_objc:
	export EXT="h|m" \
	&& make -Bs git-ls | \
	xargs clang-format-11 -i -style=file;
fmt_swift:
	swiftformat ios;
fmt_java:
	export EXT="java" \
	&& make -Bs git-ls | \
	xargs google-java-format -i;
fmt_kotlin:
	export EXT="kt" \
	&& make -Bs git-ls | \
	xargs ktfmt -i;
fmt_xml:
	export EXT="storyboard|xcscheme|xcworkspacedata" \
	&& make -Bs git-ls | \
	xargs npx prettier --parser=xml --log-level=error --write;

imagemin:
	export EXT="png|jpg|gif|ico" \
	&& make -Bs git-ls \
	| xargs -L1 bash -c 'imagemin $$0 --out-dir $$(dirname $$0)';
git-ls:
	bash -c 'comm -3 <(git ls-files) <(git ls-files -d)' \
	| egrep -h '\.($(EXT))$$';
